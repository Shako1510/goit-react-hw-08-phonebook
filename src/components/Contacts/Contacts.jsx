import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from "react-router-dom";
import { fetchContacts, deleteContact } from '../../redux/operation';
import { getFilter, getItems } from '../../redux/selectors';
import Filter from 'components/Filter/Filter';
import Form from '../Form/ContactForm'
import { SecondaryTitleBox, ListContacts, ListItem, ButtonDel, DivContainer } from './ContactsStyled';


const Contacts = () => {
    const filter = useSelector(getFilter);
    const items = useSelector(getItems);
    // const isLoged = useSelector(getIsLoged);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const contactFiltering = () => {
        const normalizeFilter = filter.toLowerCase();
        if (items.length !== 0) {
            return items.filter(item => item.name.toLowerCase().includes(normalizeFilter))
        } else if (items.length === 0) {
            return;
        }
    };

    const filteredContacts = contactFiltering();

    return (
        <DivContainer >
            <Form />
            <SecondaryTitleBox>Contacts</SecondaryTitleBox>
            {items.length !== 0 && (
                <ListContacts>
                    {
                        filteredContacts.map(({ id, name, number }) =>
                            <ListItem key={id}>
                                {name}: {number}
                                <ButtonDel type='button' onClick={() => {
                                    dispatch(deleteContact(id));
                                }}>Delete</ButtonDel>
                            </ListItem>)
                    }
                </ListContacts>
            )}
            {items.length === 0 && (
                <p>There`s no contacts yet</p>
            )}
            <Filter />
        </DivContainer >
    )
}


export default Contacts;


// import { ListContacts, ButtonDel } from './ContactsStyled';
// import { getVisibleContact } from 'redux/selectors';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteContact, fetchContacts } from 'redux/operation';
// import { useEffect } from "react";

// const Contacts = () => {

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchContacts());
//     }, [dispatch]);


//     const visibleContacts = useSelector(getVisibleContact);

//     return (
//         <ListContacts>
//             {visibleContacts.map(({ id, name, phone }) =>
//                 <li key={id}>
//                     {name}: {phone}
//                     <ButtonDel type='button' onClick={() => dispatch(deleteContact(id))}>Delete</ButtonDel>
//                 </li>)
//             }

//         </ListContacts>
//     )
// }


// export default Contacts;