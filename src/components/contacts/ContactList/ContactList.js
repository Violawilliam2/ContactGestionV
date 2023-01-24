import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {ContactService} from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';



function ContactList() {

  let [query, setQuery] = useState({
    text : ''
  })


  let [state, setState] = useState({
    loading : false,
    contacts : [],
    filteredContacts : [],
    errorMessage : ''
  });

  useEffect(() => {
    async function handleResp() {
      
      try{
        setState({...state, loading: true});
        let response = await ContactService.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts : response.data

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
  }, []);

  let clickDelect = async (contactId)=> {
    try{
      let response = await ContactService.deleteContact(contactId);
      if(response){
        setState({...state, loading: true});
        let response = await ContactService.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts : response.data

      });
      }

    }
    catch(error){
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      });

    }
  }

  let searchContacts = (event) =>{
    setQuery({
      ...query, text: event.target.value
    });
    let theContacts = state.contacts.filter(contact=>{
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({ 
      ...state,
      filteredContacts:theContacts
    });
  };


  let {loading , contacts , filteredContacts , errorMessage} = state;


  return (
    <div className='back'>
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3"> Ajouter un contact
                   <Link to={'/contacts/add'} ><button className='btns'>Nouveau</button></Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className='searchf'>
                  <input 
                  name='text'
                  value={query.text}
                  onChange={searchContacts}
                  type="text" placeholder='Rechercher un nom'  />
                  <button type='submit'><i className='fa fa-search' /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner/> : <div>
          <section className='contact-list'>
        <div className='container'>
          <div className='row'>
            {
              filteredContacts.length > 0 &&
              filteredContacts.map(contact =>{
                return(
              <div className="col-md-6" key={contact.id}>
              <div className="card my-2">
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
                    </ul>
                  </div>
                  <div className="row">
                    <Link to={`/contacts/view/${contact.id}`} ><button className='btnv'>Voir</button></Link>
                  </div>
                  <div className="row">
                    <Link to={`/contacts/edit/${contact.id}`} ><button className='btne'>Éditer</button></Link>
                  </div>
                  <div className="">
                    <button onClick={()=> clickDelect(contact.id)} className='btnd'>Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
                )
              })
            }
            
          </div>
        </div>
      </section>
        </div>
      }

    </div>
  );
}

export default ContactList;
