import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import './Quranpage.css';
import qurandata from './assets/quran-chapters.json'
import { useLocation } from 'react-router-dom';
import { getDocs ,addDoc , updateDoc, doc , collection ,where , query} from 'firebase/firestore'
import { firestore } from './firebase-config';

export default function Quranpage(props)  {

  const [chapter, setChapter] = useState(1);
  const [clickedayat , setclickedayat] = useState(null);
  const location = useLocation();
  const {userid} = location.state;
  const user_collection = collection(firestore , "bookmarks");

  const chapters = Array.from({ length: 114 }, (_, index) => index + 1);

  useEffect(() => {
    renderverses();
  }, [chapter])


const handleayatclick = (ayat)=> {
   setclickedayat(ayat);
}


const handleexit =() =>{
    setclickedayat(null);
    console.log(clickedayat);
}

const getrecords = async()=>{
  try{
    const q = query(user_collection, where('uid', '==', userid));
    const users = await getDocs(q);
    const userData = users.docs.map(doc => doc.data());
    console.log(userData);
  }catch(error){
    console.log(error);
  }
  
}
const handlebookmark =()=>{
   if(props.loginstate === true){
       const currentuser = getrecords();
   }else{
    alert('Login to Bookmark this ');
   }
}

  const renderverses = () => {
    if (qurandata.hasOwnProperty(chapter.toString())) {
      return qurandata[chapter.toString()].map((ayat) => (
        <span className='ayat' onClick={()=>{handleayatclick(ayat)}}>
              {ayat.text}
              <span className='end-symbol'> ۝</span>
              {clickedayat && clickedayat.verse === ayat.verse && (
                <div className='hover-card'>
                  <strong>Chapter:</strong> {ayat.chapter}, <strong>Verse:</strong> {ayat.verse}
                  <span className='ayat-card'>{ayat.text} ۝</span>
                  <button type = 'button' className='ayat-bookmark-button' onClick={handlebookmark} >Bookmark this Ayat</button>
                  <button type = 'button' className='card-removal-button' onClick={handleexit} >Return</button>
                </div>
              )}
            </span>
      ))
    }
    return "Chapter not found"
  }


  return (
    <div>
      <div className='quran-page'>
        <Navbar setloginstate={props.setloginstate}/>
        <div className="quran-page-container">
          <div className="chapter-selection">
            <label><strong>Select Chapter :</strong></label>
            <select value={chapter} onChange={(e) => { setChapter(parseInt(e.target.value)) }} >
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </div>
          <div className="quran-card">
            <h2>Chapter {chapter} Ayahs</h2>
            <div className='amiri'>
              <h2>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
              {renderverses()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
