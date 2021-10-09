import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { icons } from '../constant'
import { filterTeam, calculateOdds } from '../utils'

export function OddsModal (props) {
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
            src={icons[filterTeam(team1)]}
            rounded
            style={{
              width: '25px',
              height: '25px',
              marginRight: '5px'
            }}
          />{' '}
          {team1} vs.{' '}
          <Image
            src={icons[filterTeam(team2)]}
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
