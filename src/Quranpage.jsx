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
  const {userid} = location.state || {};
  const user_collection = collection(firestore , "bookmarks");
  const [user , setuser] = useState([]);

  const chapters = Array.from({ length: 114 }, (_, index) => index + 1);

  useEffect(() => {
    renderverses();
  }, [chapter])

  useEffect(()=>{
     fetchnotes();
  },[userid])

const handleayatclick = (ayat)=> {
   setclickedayat(ayat);
}


const handleexit = () =>{
    setclickedayat(null);
}

const getrecord = async()=>{
  try{
    const q = query(user_collection, where('uid', '==', userid));
    const users = await getDocs(q);
    const userData = users.docs.map(doc => doc.data());
    return userData;
  }catch(error){
    console.log(error);
  }
}

const fetchnotes = async()=>{
  const userdata = await getrecord();
  setuser(userdata);
}


const handlebookmark = async (ayat) => {
  if (props.loginstate === true) {
    try {
      const q = query(user_collection, where('uid', '==', userid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          'bookmark.chapterno': ayat.chapter,
          'bookmark.ayatno': ayat.verse,
        });

        alert('Bookmark updated!');
        fetchnotes(); // Refresh bookmarks
      } else {
        alert('No existing bookmark found to update.');
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  } else {
    alert('Login to Bookmark this Ayat');
  }
};

const handlebookmarclick = (chp)=>{
     setChapter(chp);
}



  const renderverses = () => {
    if (qurandata.hasOwnProperty(chapter.toString())) {
      return qurandata[chapter.toString()].map((ayat) => (
        <span className='ayat' onClick={()=>{handleayatclick(ayat)}}>
              {ayat.text}
              <span className='end-symbol'> ۝</span>
              {clickedayat && clickedayat.verse === ayat.verse ? (
            <div className='hover-card'>
              <strong>Chapter:</strong> {ayat.chapter}, <strong>Verse:</strong> {ayat.verse}
              <span className='ayat-card'>{ayat.text} ۝</span>
              <button type='button' className='ayat-bookmark-button' onClick={() => { handlebookmark(ayat) }}>Bookmark this Ayat</button>
              <button type='button' className='card-removal-button' onClick={handleexit}>Return</button>
            </div>
          ): null}
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
        <div className='upper-sec'>
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
          <div className='info-card'> 
              <label style={{paddingTop : '14px' , marginRight : '15px' , marginLeft : '15px'}}><strong>BOOKMARK :</strong></label>
               {props.loginstate ? (user  && (
                user.map((userData, index) => (
                 <p key={index} onClick={()=>{handlebookmarclick(userData.bookmark.chapterno)}}>{userData.bookmark.chapterno} : {userData.bookmark.ayatno}</p>
                ))
              )) : (<p>None </p>)}
          </div>
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
