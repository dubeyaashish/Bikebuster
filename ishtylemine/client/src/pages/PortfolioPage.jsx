
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function PortolioFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [experience,setExperience] = useState('')
  const [address,setAddress] = useState('');
  const [price,setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/portfolios/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setDescription(data.description);
       setPrice(data.price);
       setExperience(data,experience);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePortolio(ev) {
    ev.preventDefault();
    const portfolioData = {
      title, address,
      description, price, experience,
    };
    if (id) {
      // update
      await axios.put('/portfolios', {
        id, ...portfolioData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/porfolios', portfolioData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/portfolios'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePortolio}>
        {preInput('Title', 'Title for you. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: Sasha "/>
        {preInput('Address', 'Address you serve')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Your experience')}
        <textarea value={experience} onChange={ev => setExperience(ev.target.value)} />
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price per hour</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}