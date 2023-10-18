import React from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import { useState } from 'react'
import './index.css'

export default function EmojiGame(props) {
const[topScore,setTopScore]=useState(0);
const[clickedEmojisList,setEmojisList]=useState([]);
const[isGameInProgress,setGameProgress]=useState(true)


const emojisList=props

const resetGame=()=>{
setEmojisList([])
setGameProgress(true)
}


const renderScoreCard=()=>{
    const isWon=clickedEmojisList.length===setEmojisList.length
    return(
        <WinOrLoseCard 
        isWon={isWon}
        onClickPlayAgain={resetGame}
        score={clickedEmojisList.length}/>
    )

}


const finishGameAndSetTopScore=currentScore=>{
    let newTopScore=topScore

    if(currentScore>topScore){
        newTopScore=currentScore
    }
    setTopScore(newTopScore)
    setGameProgress(false)
}


const clickEmoji=id=>{
    
    const isEmojiPresent=clickedEmojisList.includes(id)
    const clickedEmojisLength=clickedEmojisList.length

    if(isEmojiPresent){
        finishGameAndSetTopScore(clickedEmojisLength)
    }else{
        if(emojisList.length-1===clickedEmojisLength){
            finishGameAndSetTopScore(emojisList.length)
        }
        setEmojisList([...clickedEmojisList,id])
    }
}


const getShufflesEmojisList=()=>{
    const{emojisList}=props
    
    return emojisList.sort(()=>Math.random()-0.5)
}


const renderEmojiList=()=>{
    const shuffledEmojisList=getShufflesEmojisList()

    return(
        <ul className='emojis-list-container'>
            {shuffledEmojisList.map(emojiObject=>(
                <EmojiCard 
                key={emojiObject.id}
                emojiDetails={emojiObject}
                clickEmoji={clickEmoji}/>
            ))}
        </ul>
    )
}

  return (
    <div className='main-container'>
    <NavBar
     isGameInProgress={isGameInProgress}   
     topScore={topScore}
     currentScore={clickedEmojisList.length}
    />
      <div className='emoji-game-body'>
        {isGameInProgress?renderEmojiList():renderScoreCard()}
      </div>
    </div>
  )
}
