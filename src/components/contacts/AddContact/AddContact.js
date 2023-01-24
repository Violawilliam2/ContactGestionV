import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ContactService} from '../../../services/ContactService';


function AddContact() {
  let navigate = useNavigate();

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

  let updateInput = (event)=>{
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name] : event.target.value
      }
    });
  };

  useEffect(() => {
    async function handleResp() {
      
      try{
        setState({...state, loading: true});
        let response = await ContactService.getGroups();
      setState({
        ...state,
        loading: false,
        groups: response.data

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

  let submitForm = async(event) => {
    event.preventDefault();
    
      
           try{
            let response = await ContactService.createContact(state.contact);
            if(response){
               navigate('/contacts/list', {replace:true});
            }
         
           }
           catch(error){
            setState({
              ...state,
              errorMessage: error.message
            });
            navigate('/contacts/add', {replace:false});
           }
    
    };


  let {loading , contact , errorMessage , groups} = state;


  return (
    <div className='back'>
      <section className='contact-search p-3'>
              <div className="col">
                <p className="h3"> Créer un contact</p>
        </div>
      </section>

      <section className='contact-list'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="col-md-7">
                    <form onSubmit={submitForm} className='list-group'>
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
                       type='text' className='list-group-item' placeholder='Société'/>
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
                         <option value='' className='fw-bold'>Sélectionnez un groupe</option>
                         {
                            groups.length > 0 &&
                            groups.map(group =>{
                            return(
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                          })
                         }
                      </select>
                       <div className="mb-2">
                  <input type='submit'  className=' btn btn-success btnc'value='Créer'/>
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
  );
}

export default AddContact;
