import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Alert from 'react-bootstrap/Alert'
import { fetchOdds } from '../api/fetchOdds'
import { sportsList } from '../constant'
import { OddsModal } from './OddsModal'
import { SportsCard } from './SportsCard'
import '../stylesheets/App.scss'

function App () {
  const [odds, setOdds] = useState(null)
  const [activeSport, setActiveSport] = useState('soccer_epl')
  const [activeGame, setActiveGame] = useState({})
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    const getOdds = async () => {
      const result = await fetchOdds()
      if (result.success) {
        setOdds({ ...odds, soccer_epl: result.data })
      }
    }

    getOdds()
  }, [])

  if (!odds) {
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
              {odds[activeSport] &&
                odds[activeSport].map(sportsGame => {
                  return (
                    <Col
                      key={sportsGame.id}
                      xs={12}
                      md={4}
                      className='mb-3'
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <SportsCard
                        sportsGame={sportsGame}
                        onSeeMoreOdds={onSeeMoreOdds}
                      />
                    </Col>
                  )
                })}
            </Row>
          </Col>
        </Row>
      </Container>
      <OddsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeGame={activeGame}
      />
    </>
  )
}

export default App
