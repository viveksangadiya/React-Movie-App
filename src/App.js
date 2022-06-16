import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";

const API_KEY="63f43fa8";
const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
background-color: black;
color: white;
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;

const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: white;
`;
const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;
const SearchInput = styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 25px;
justify-content: space-evenly;;
`;

const Placeholder = styled.img`
  width: 50px;
  height: 50px;
  margin: 150px;
  opacity: 100%;
`;
function App() {

  const [searchQuery,updateSearchQuery]=useState();
  const[timeoutId,updatetimeoutId]=useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

const fetchData=async (searchString)=>{
   const response = await axios.get(
    `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
   );
   updateMovieList(response.data.Search);
}

  const onTextChange=(event)=>{
     clearTimeout(timeoutId);
     updateSearchQuery(event.target.value);
     const timeout=setTimeout(()=>fetchData(event.target.value),500);
     updatetimeoutId(timeout);
  }
 
  return ( 
    
  <Container>
    <Header>
      <AppName>
        <MovieImage src="/movie.png"></MovieImage>
        
        React movie app</AppName>
        <SearchBox>
          <SearchIcon src="/search.png"></SearchIcon>
          <SearchInput
            placeholder="Search Movie"    
            onChange={onTextChange}  
            value={searchQuery} 
          />
        </SearchBox>
    </Header>
    
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

    <MovieListContainer>
    {movieList?.length ?
    movieList.map((movie,index)=> <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/> ) : <Placeholder src="/movie.png" />
    }
      
    </MovieListContainer>
  </Container>
  );
}

export default App;
