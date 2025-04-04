let currSong=new Audio()


async function songs() {
    let a=await fetch("http://127.0.0.1:3000/Spotify%201/songs/")
    let res=await a.text()
    // console.log(res)
    let song=[]
    let div=document.createElement("div")
    div.innerHTML=res
    let links=div.getElementsByTagName("a")
    // console.log(links)

    for (let index = 0; index < links.length; index++) {
        const element = links[index];
        if(element.href.endsWith(".m4a")){
            song.push(element.href.split("/songs/")[1])
        }
        
    }
    return song
}


const playmusic=(s) =>{
    currSong.src = "http://127.0.0.1:3000/Spotify%201/songs/"+s
    currSong.play()
    const play = document.querySelector('.play');
    play.src="pause.svg"
    document.querySelector(".con").innerHTML=s


}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Get minutes
    const remainingSeconds = Math.floor(seconds % 60); // Get remaining seconds

    // Pad single digit seconds with a leading zero
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return formatted time as min:sec
    return `${minutes}:${formattedSeconds}`;
}




async function main() {
    let allsongs= await songs()
    // console.log(allsongs)

    let content1=document.querySelector(".one1").getElementsByTagName("p")[0]
    let content2=document.querySelector(".two2").getElementsByTagName("p")[0]
    let content3=document.querySelector(".three3").getElementsByTagName("p")[0]
    let content4=document.querySelector(".four4").getElementsByTagName("p")[0]
    content1.innerHTML=allsongs[0].replaceAll("%20"," ")
    content2.innerHTML=allsongs[1].replaceAll("%20"," ")
    content3.innerHTML=allsongs[2].replaceAll("%20"," ")
    content4.innerHTML=allsongs[3].replaceAll("%20"," ")

    const array = [content1.innerHTML, content2.innerHTML, content3.innerHTML, content4.innerHTML];
    const ani = document.querySelectorAll(".svgg");

    ani.forEach((svg, index) => {
        svg.addEventListener("click", () => {
            // Log the current song from the array based on the index
            // console.log(array[index].innerHTML);
            // Call playmusic with the innerHTML of the corresponding content element
            playmusic(array[index]);
        });
    });
    
       
    const play = document.querySelector('.play');

    play.addEventListener("click",()=>{
        if (currSong.paused){
            currSong.play()
            play.src="pause.svg"

        }
        else{
            currSong.pause()
            play.src="play.svg"

        }
    })

    


    // const volumeControl=document.querySelector(".vol");
    volumeControl.addEventListener("input", (e) => {
        const volumeValue = e.target.value / 100;
        currSong.volume = volumeValue;
    
        // Update the volume icon depending on the volume level
        if (volumeValue === 0) {
            volumeIcon.src = "mute.svg";
            currSong.muted = true;
        } else {
            volumeIcon.src = "volume.svg";
        }
    });

    const volumeIcon=document.querySelector(".volumebar");
    
    volumeIcon.addEventListener("click",()=>{
        if (currSong.muted) {
            currSong.muted = false;
            // console.log(currSong.volume)
            volumeControl.value = currSong.volume * 100;
            volumeIcon.src = "volume.svg"; // Show volume icon
        } else {
            currSong.muted = true;
            volumeControl.value = 0;
            volumeIcon.src = "mute.svg"; // Show mute icon
        }
    })
 
    currSong.addEventListener("timeupdate",()=>{
        // console.log(currSong.currentTime,currSong.duration)
        document.querySelector(".duration").innerHTML=`${formatTime(currSong.duration)}`
        document.querySelector(".current").innerHTML=`${formatTime(currSong.currentTime)}`
        document.querySelector(".circle").style.left=(currSong.currentTime/currSong.duration)*100+'%'



    })

    document.querySelector(".seek").addEventListener("click",e=>{
        let covered=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=(covered)*100+'%';
        currSong.currentTime=(covered*currSong.duration)/100
    })

    let prev=document.querySelector(".pre");
    prev.addEventListener("click",()=>{
        
        let song_selected=String(currSong.src.split('/').slice(-1)[0])
        song_selected=song_selected.replaceAll("%20"," ")
        let index=array.indexOf(song_selected)
        // console.log(index)
        
        if( index-1>-1){
            playmusic(array[index-1])
        }
                
        
    })


    let next=document.querySelector(".next");
    next.addEventListener("click",()=>{
        
        let song_selected=String(currSong.src.split('/').slice(-1)[0])
        song_selected=song_selected.replaceAll("%20"," ")
        let index=array.indexOf(song_selected)
        // console.log(index)
        
        if( index+1<array.length){
            playmusic(array[index+1])
        }
                
        
    })
    





}

main()
