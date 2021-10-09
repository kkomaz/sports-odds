import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { icons } from '../constant'
import { filterTeam, calculateOdds, getDate } from '../utils'
import { PatchMinus } from 'react-bootstrap-icons'
import Image from 'react-bootstrap/Image'

export function SportsCard (props) {
  const { sportsGame, onSeeMoreOdds } = props

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Row>
          <Card.Subtitle className='mb-2 text-muted'>
            Game Date: {getDate(sportsGame['commence_time'])}
          </Card.Subtitle>
          <Card.Text>
            <Image
              src={icons[filterTeam(sportsGame.teams[0])]}
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
            <PatchMinus size={25} style={{ marginRight: '5px' }} />
            Draw: {calculateOdds(sportsGame.sites[0].odds.h2h[2])}
          </Card.Text>
          <Card.Text>
            <Image
              src={icons[filterTeam(sportsGame.teams[1])]}
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
            Powered by <strong>{sportsGame.sites[0].site_nice}</strong>
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
  )
}
