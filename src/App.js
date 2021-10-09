import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import { PatchMinus } from 'react-bootstrap-icons'
import axios from 'axios'
import './App.scss'

const options = {
  method: 'GET',
  url: 'https://odds.p.rapidapi.com/v1/odds',
  params: {
    sport: 'soccer_epl',
    region: 'us',
    mkt: 'h2h',
    dateFormat: 'iso',
    oddsFormat: 'american'
  },
  headers: {
    'x-rapidapi-host': 'odds.p.rapidapi.com',
    'x-rapidapi-key': 'khjAzSBev7msh91ooKtzdIjMWF8Xp1lpeaejsnieP0xUdqG32y'
  }
}

const sportsList = [
  { key: 'soccer_epl', view: 'Premier League' },
  { key: 'americanfootball_nfl', view: 'NFL' }
]

const teamIcon = {
  watford:
    'https://resources.premierleague.com/premierleague/badges/25/t57.png',
  arsenal: 'https://resources.premierleague.com/premierleague/badges/50/t3.png',
  aston_villa:
    'https://resources.premierleague.com/premierleague/badges/25/t7.png',
  brentford:
    'https://resources.premierleague.com/premierleague/badges/25/t94.png',
  brighton_and_hove_albion:
    'https://resources.premierleague.com/premierleague/badges/25/t36.png',
  burnley:
    'https://resources.premierleague.com/premierleague/badges/25/t90.png',
  chelsea: 'https://resources.premierleague.com/premierleague/badges/25/t8.png',
  crystal_palace:
    'https://resources.premierleague.com/premierleague/badges/25/t31.png',
  everton:
    'https://resources.premierleague.com/premierleague/badges/25/t11.png',
  leeds_united:
    'https://resources.premierleague.com/premierleague/badges/25/t2.png',
  leicester_city:
    'https://resources.premierleague.com/premierleague/badges/25/t13.png',
  liverpool:
    'https://resources.premierleague.com/premierleague/badges/25/t14.png',
  manchester_city:
    'https://resources.premierleague.com/premierleague/badges/25/t43.png',
  manchester_united:
    'https://resources.premierleague.com/premierleague/badges/25/t1.png',
  newcastle_united:
    'https://resources.premierleague.com/premierleague/badges/25/t4.png',
  tottenham_hotspur:
    'https://resources.premierleague.com/premierleague/badges/25/t6.png',
  norwich_city:
    'https://resources.premierleague.com/premierleague/badges/25/t45.png',
  wolverhampton_wanderers:
    'https://resources.premierleague.com/premierleague/badges/25/t39.png',
  west_ham_united:
    'https://resources.premierleague.com/premierleague/badges/25/t21.png',
  southampton:
    'https://resources.premierleague.com/premierleague/badges/25/t20.png',
  draw: 'https://www.iconsdb.com/icons/preview/gray/minus-4-xxl.png'
}

const filterTeam = team => {
  return team
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .join('_')
}

const calculateOdds = value => {
  if (Math.sign(value) === 1) {
    return `+${value}`
  }
  return value
}

const getDate = date => {
  const value = new Date(date)
  return `${value.getUTCMonth() +
    1}-${value.getUTCDate()}-${value.getFullYear()}`
}

function MyVerticallyCenteredModal (props) {
  const { activeGame } = props

  if (Object.keys(activeGame).length === 0) {
    return null
  }

  const team1 = activeGame.teams[0]
  const team2 = activeGame.teams[1]

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <Image
            src={teamIcon[filterTeam(team1)]}
            rounded
            style={{
              width: '25px',
              height: '25px',
              marginRight: '5px'
            }}
          />{' '}
          {team1} vs.{' '}
          <Image
            src={teamIcon[filterTeam(team2)]}
            rounded
            style={{
              width: '25px',
              height: '25px',
              marginRight: '5px',
              marginLeft: '5px'
            }}
          />
          {team2}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Sportsbook</th>
              <th>{team1}</th>
              <th>Draw</th>
              <th>{team2}</th>
            </tr>
          </thead>
          <tbody>
            {activeGame.sites.map(site => {
              return (
                <tr key={site.site_key}>
                  <td>{site.site_nice}</td>
                  <td>{calculateOdds(site.odds.h2h[0])}</td>
                  <td>{calculateOdds(site.odds.h2h[2])}</td>
                  <td>{calculateOdds(site.odds.h2h[1])}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

function App () {
  const [sports, setSports] = useState({})
  const [activeSport, setActiveSport] = useState('soccer_epl')
  const [activeGame, setActiveGame] = useState({})
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const result = await axios.request(options)
        setSports({ ...sports, soccer_epl: result.data.data })
      } catch (e) {
        console.log(e)
      }
    }

    fetchOdds()
  }, [])

  if (Object.keys(sports).length === 0) {
    return null
  }

  const onSeeMoreOdds = game => {
    setActiveGame(game)
    setModalShow(true)
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' className='mb-2'>
        <Container>
          <Navbar.Brand>Sports Odds Collection</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Alert variant='light'>
            Created by{' '}
            <a
              href='https:///www.techrally.co'
              target='_blank'
              rel='noreferrer'
            >
              TechRally
            </a>{' '}
            ❤️
          </Alert>
          <Col xs={12} md={2} className='mb-2'>
            <ListGroup>
              {sportsList.map(sport => {
                return (
                  <ListGroup.Item
                    key={sport.key}
                    as='button'
                    active={activeSport === sport.key}
                    onClick={() => setActiveSport(sport.key)}
                  >
                    {sport.view}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col xs={12} md={10}>
            <Row>
              {sports[activeSport] &&
                sports[activeSport].map(sportsGame => {
                  return (
                    <Col
                      key={sportsGame.id}
                      xs={12}
                      md={4}
                      className='mb-3'
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Card style={{ width: '20rem' }}>
                        <Card.Body>
                          <Row>
                            <Card.Subtitle className='mb-2 text-muted'>
                              Game Date: {getDate(sportsGame['commence_time'])}
                            </Card.Subtitle>
                            <Card.Text>
                              <Image
                                src={teamIcon[filterTeam(sportsGame.teams[0])]}
                                rounded
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginRight: '5px'
                                }}
                              />
                              {sportsGame.teams[0]} :{' '}
                              {calculateOdds(sportsGame.sites[0].odds.h2h[0])}
                            </Card.Text>
                            <Card.Text>
                              <PatchMinus
                                size={25}
                                style={{ marginRight: '5px' }}
                              />
                              Draw:{' '}
                              {calculateOdds(sportsGame.sites[0].odds.h2h[2])}
                            </Card.Text>
                            <Card.Text>
                              <Image
                                src={teamIcon[filterTeam(sportsGame.teams[1])]}
                                rounded
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  marginRight: '5px'
                                }}
                              />
                              {sportsGame.teams[1]}:{' '}
                              {calculateOdds(sportsGame.sites[0].odds.h2h[1])}
                            </Card.Text>
                            <Card.Text>
                              Powered by{' '}
                              <strong>{sportsGame.sites[0].site_nice}</strong>
                            </Card.Text>
                            <Card.Text>
                              <Button
                                style={{ padding: '0' }}
                                variant='link'
                                onClick={() => onSeeMoreOdds(sportsGame)}
                              >
                                See more odds
                              </Button>
                            </Card.Text>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })}
            </Row>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeGame={activeGame}
      />
    </>
  )
}

export default App
