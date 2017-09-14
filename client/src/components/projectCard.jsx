import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ProjectStatus from './projectStatus.jsx';
import SupportModal from './supportModal.jsx';



const ProjectCard = (props) => (
  <Card fluid raised>

    <Image src={props.project.photo_url}/>

    <Card.Content >

      <Card.Header>
        {props.profilePage ?
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '-3%'}}>
            {props.project.name}
            <Popup
              trigger={
                <Link to={`/editproject/${props.id}`}>
                  <Icon name='edit' circular inverted color='teal'/>
                </Link>
              }
              content='Edit your project'
              position='left center'
            />
          </div> : props.project.name
        }
      </Card.Header>

      <Card.Meta>
        <div style={{display: 'flex', justifyContent: 'left', color: 'black'}}>
        By {props.creatorName}
        </div>
      </Card.Meta>

      <Card.Description>
        {props.project.short_description}
      </Card.Description>

    </Card.Content>

    <Card.Content extra>

      <ProjectStatus
        name={props.project.name}
        contributed={props.project.raised_amount}
        funded={Math.round(100 * (props.project.raised_amount / props.project.goal_amount)).toString()}
        daysRemaining={props.daysRemaining(props.project)}
      />

      <SupportModal />

    </Card.Content>

  </Card>
);

export default ProjectCard;
