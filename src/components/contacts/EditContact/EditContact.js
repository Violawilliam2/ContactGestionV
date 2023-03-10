import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {ContactService} from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

function EditContact() {
   let navigate = useNavigate();
  let {contactId} = useParams();

  let [state, setState] = useState({
    loading : false,
    contact : {
      name: '',
      email: '',
      mobile: '',
      ville: '',
      title: '',
      societe: '',
      groupId:''
    },
    groups : [],
    errorMessage : ''
  });

  useEffect(() => {
    async function handleResp() {
      
      try{
        setState({...state, loading: true});
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data

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

  let updateInput = (event)=>{
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name] : event.target.value
      }
    });
  };

  let submitForm = async(event) => {
    event.preventDefault();
    
      
           try{
            let response = await ContactService.updateContact(state.contact, contactId);
            if(response){
               navigate('/contacts/list', {replace:true});
            }
         
           }
           catch(error){
            setState({
              ...state,
              errorMessage: error.message
            });
            navigate(`/contacts/edit/${contactId}`, {replace:false});
           }
    
    };

  let{loading, contact, groups, errorMessage}= state;


  return (
    <div className='back'>
      {
        loading ? <Spinner/> : <div>
          <section className='contact-search p-3'>
              <div className="col">
                <p className="h3"> Mettre ?? jour un contact</p>
        </div>
      </section>

      <section className='contact-list'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="col-md-7">
                    <form  onSubmit={submitForm} className='list-group'>
                      <div>
                      <input 
                      required="true"
                      name="name"
                      value={contact.name}
                      onChange={updateInput}
                      type='text' className='list-group-item' placeholder='Nom'/>
                      </div>
                      <div>
                      <input
                       required="true"
                       name="email"
                       value={contact.email}
                       onChange={updateInput}
                       type='email' className='list-group-item' placeholder='Email'/>
                      </div>
                      <div>
                      <input 
                       required="true"
                       name="mobile"
                       value={contact.mobile}
                       onChange={updateInput}
                      type='number' className='list-group-item' placeholder='Tel'/>
                      </div>
                      <div>
                      <input
                      required="true"
                      name="title"
                      value={contact.title}
                      onChange={updateInput}
                       type='text' className='list-group-item' placeholder='Titre'/>
                      </div>
                      <div>
                      <input
                      required="true"
                      name="societe"
                      value={contact.societe}
                      onChange={updateInput}
                       type='text' className='list-group-item' placeholder='Soci??t??'/>
                      </div>
                      <div>
                      <input
                      required="true"
                      name="ville"
                      value={contact.ville}
                      onChange={updateInput}
                       type='text' className='list-group-item' placeholder='Ville'/>
                      </div>
                      <select 
                      required="true"
                      name="groupId"
                      value={contact.groupId}
                      onChange={updateInput}
                      className='list-group-item'>
                         <option value='' className='fw-bold'>S??lectionnez un groupe</option>
                         {
                          groups.length > 0 &&
                          groups.map(group =>{
                            return(
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                          })
                         }
                      </select>
                      <div className="">
                   <button type='submit' className='btnu'>Mettre ?? jour</button>
                  </div>
                  <div className="row">
                    <Link to={'/contacts/list'}><button className='btncd'>Annuler</button></Link>
                  </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div> 
      }
       
    </div>
  )
}

export default EditContact;