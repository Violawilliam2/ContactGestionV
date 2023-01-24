import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {ContactService} from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

function ViewContact() {
  let {contactId} = useParams();

  let [state, setState] = useState({
    loading : false,
    contact : {},
    errorMessage : '',
    group : {}
  });

  useEffect(() => {
    async function handleResp() {
      
      try{
        setState({...state, loading: true});
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroup(response.data);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        group: groupResponse.data

      });
        
      }
      catch (error){
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    };

    handleResp();
  }, [contactId]);

  let {loading , contact , errorMessage, group} = state;
  return (
    <div className='back'>
       <section className='contact-search p-3'>
                <p className="h3"> Voir un contact</p>
      </section>
      {
        loading ? <Spinner/>: <div>
          {
            Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
        <section className='contact-list'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="col-md-7">
                    <ul className='list-group'>
                      <li className='list-group-item'>
                        Nom : <span className='fw-bold'>{contact.name}</span>
                      </li>
                      <li className='list-group-item'>
                        Email : <span className='fw-bold'>{contact.email}</span>
                      </li>
                      <li className='list-group-item'>
                        Tel : <span className='fw-bold'>{contact.mobile}</span>
                      </li>
                      <li className='list-group-item'>
                        Ville : <span className='fw-bold'>{contact.ville}</span>
                      </li>
                      <li className='list-group-item'>
                        Titre: <span className='fw-bold'>{contact.title}</span>
                      </li>
                      <li className='list-group-item'>
                        Société : <span className='fw-bold'>{contact.societe}</span>
                      </li>
                      <li className='list-group-item'>
                        Groupe : <span className='fw-bold'>{group.name}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <Link to={'/contacts/list/'} ><button className='btnvc'>Retourner</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          }
        </div>
      }
      
    </div>
  )
};

export default ViewContact;