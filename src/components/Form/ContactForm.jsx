import { useDispatch, useSelector } from 'react-redux';
import { FormBox, ButtonAdd, InputBox, LabelBox } from './FormStyled';
import { useState } from 'react';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operation';

export function Form() {

    const [name, setName] = useState('');
    const [number, setPhone] = useState('');

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    const handleInputChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'number':
                setPhone(value)
                break;
            default:
                console.log('incorrect input name');
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (contacts.find(contact => contact.name === name)) {
            alert(`${name} is already in contacts`);
            return;
        }

        dispatch(addContact({ name, number }));
        setName('');
        setPhone('');

    };

    return (
        <FormBox>
            <form onSubmit={handleSubmit}>
                <LabelBox >Name
                    <InputBox
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={handleInputChange}
                        value={name}

                    />
                </LabelBox>

                <LabelBox>Number
                    <InputBox
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={handleInputChange}
                        value={number}
                    />
                </LabelBox>

                <ButtonAdd type="submit">Add contact</ButtonAdd>
            </form>
        </FormBox >
    )

}

export default Form;
