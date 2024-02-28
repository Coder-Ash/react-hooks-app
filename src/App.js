import React, { useState, useEffect } from 'react';
import './App.css';

const initialArticles = [
  {
    title: 'ONE'
  },
  {
    title: 'TWO'
  },
  {
    title: 'THREE'
  }
];




const App = ()=> {
  const [selectedArticleId, setSelectedArticleId] = useState(-1);
  const [articles, setArticles] = useState(initialArticles);
  const [formObject, setFormObject] = useState({title: 'title1', content: 'content1'});
  const getArticles = async () => {
    const data = await fetch('articles.json');
    setArticles(await data.json());
  }

  useEffect(() => {
    getArticles()
  }, []);

  const selectedArticle = (articles[selectedArticleId]) ? articles[selectedArticleId].content : 'none';

  const changeHandler = (event)=> {
    const name = event.target.name;
    const value = event.target.value;
    formObject[name] = value;  
    setFormObject({...formObject});
  }
  const validSelectedArticleId = ()=> {
    return (selectedArticleId >= 0 && selectedArticleId < articles.length)
  }

  const deleteSelected = ()=> {
    if (validSelectedArticleId()) {
      articles.splice(selectedArticleId, 1);
      setArticles([...articles]);
    }
  }
  return (
    <div className="App">
      <h2>React Hooks App</h2>
      <ul>
        {
          articles.map(
            (article, index) => {
              return <li key={index} className={(selectedArticleId === index) ? 'selected' : ''} onClick={(e) => setSelectedArticleId(index)}>{article.title}</li>
            }
          )
        }
      </ul>
      <br /><span className={'bold'}>Selected Article:</span>
      <p>{selectedArticle}</p><br />
      <div className={'controls'}>
        <span className={'bold'}>Controls:</span><br />
        <button onClick={() => setArticles([...articles, {title: formObject.title, content: formObject.content}])} >Add Article</button>&nbsp;
        <button onClick={() => deleteSelected()} disabled={!validSelectedArticleId()} >Delete Selected</button>
        <br />
        <input type={'text'} name={'title'} placeholder={'title'} value={formObject.title} onChange={(e) => changeHandler(e)} /><br />
        <input type={'text'} name={'content'} placeholder={'content'} value={formObject.content} onChange={(e) => changeHandler(e)} /><br />
      </div>
    </div>
  );
}

export default App;
