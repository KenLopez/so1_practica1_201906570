import { useEffect, useState } from 'react';;
import {Segment, Menu} from 'semantic-ui-react';

function Navbar(props) {
  const [activeItem, setActiveItem] = useState('home')
  
  useEffect(() => {
    setActiveItem(props.item);
  }, [])
  

  return (
    <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => setItem('home')}
            href='/home'
          />
          <Menu.Item
            name='registro'
            active={activeItem === 'registro'}
            onClick={() => setItem('registro')}
            href='/registro'
          />
        </Menu>
    </Segment>
  )
}

export default Navbar