
var blocks = 100
const cb = document.querySelector('#crossword_board')
var md = false
var num_words = 3

function addBlocks() {
  for(var i=0;i<blocks;i++){
    var b = document.createElement('div')
    b.className = 'block'
    cb.appendChild(b)
  }
}

function addWords(){  
  var words = ['red','orange','gold','green','blue','indigo','violet','hotpink','turquoise'] 
  // max word length of 10
  words.sort(() => Math.random() - 0.5);
  words = words.slice(0,num_words)

  var arr = [];
  while(arr.length < 3){
    var r = Math.floor(Math.random() * 10);
    if(arr.indexOf(r) === -1) arr.push(r);
  }

  words.forEach(function(elm){
    var word_length = elm.length
    var offset = Math.floor(Math.random()*(11-word_length))
    var w_start = offset + (arr[0] * 10)
    arr.shift()    
    elm.split('').forEach(function(e){
      var b = document.querySelectorAll('.block')[w_start]
      b.innerHTML = e
      b.classList.add('letter')
      b.classList.add(elm)
      b.onmousedown = function() {
        this.classList.add('letter_pop')
        this.style.background = this.classList[2]
        if(document.querySelectorAll('.'+elm+'.letter_pop').length == elm.length) {
          document.querySelectorAll('.listed_word').forEach(function(e){
            if(e.innerHTML == elm) {
              e.classList.add('found_word')
              document.documentElement.style.setProperty('--bg-color', e.innerHTML)
            }
          })
        }
        setTimeout(you_win, 500)
      }
      b.onmouseenter = function() {
        if(md) {
          this.classList.add('letter_pop')
          this.style.background = this.classList[2]
          if(document.querySelectorAll('.'+elm+'.letter_pop').length == elm.length) {
            document.querySelectorAll('.listed_word').forEach(function(e){
              if(e.innerHTML == elm) {
                e.classList.add('found_word')
                document.documentElement.style.setProperty('--bg-color', e.innerHTML)
              }
            })
          }
          setTimeout(you_win, 500)
        }        
      }

      if(elm.split('').indexOf(e) == 0 
         && (b.previousSibling
             && !b.previousSibling.classList.contains(elm)) 
         || !b.previousSibling) {
        b.classList.add('first_letter')
      }
      if(elm.split('').indexOf(e) == elm.split('').length - 1) {
        b.classList.add('last_letter')
      }      
      w_start++
    })
    var w = document.createElement('div')
    w.className = 'listed_word'
    w.innerHTML = elm
    document.body.appendChild(w)
  })    
}

function you_win() {
  if(document.querySelectorAll('.found_word').length == num_words) {
    md = false
    cb.removeEventListener('mousedown', mouse_down)
    cb.removeEventListener('mouseup', mouse_down)

    cb.classList.add('game_winner')
  }
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
function fillInEmpty() {
  var b = document.querySelectorAll('.block')
  b.forEach(function(elm){
    if(elm.innerHTML == '') {
      var letter = alphabet.split('')[Math.floor(Math.random()*alphabet.length)]
      elm.innerHTML = letter
    }
  })
}

addBlocks()
addWords()
fillInEmpty() 

function mouse_down(event) {
  if(!md) {
    md = true
  } else {
    md = false
  }

  if(event.type == 'touchmove') {
    var block = document.elementFromPoint(event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY)
    if(block.classList.contains('letter')) {
      block.style.background = block.classList[2]
      block.classList.add('letter_pop')      
    }
    var elm = block.classList[2]
    if(document.querySelectorAll('.'+elm+'.letter_pop').length == elm.length) {
      document.querySelectorAll('.listed_word').forEach(function(e){
        if(e.innerHTML == elm) {
          e.classList.add('found_word')
          document.documentElement.style.setProperty('--bg-color', e.innerHTML)
        }
      })
    }
    setTimeout(you_win, 500)
  }
}

function setGameUp() {
  cb.innerHTML = ''
  cb.className = ''
  document.documentElement.style.setProperty('--bg-color', '#666')
  document.querySelectorAll('.listed_word').forEach(function(e){
    e.remove()
  })

  addBlocks()
  addWords()
  fillInEmpty() 

  cb.addEventListener('mousedown', mouse_down)
  cb.addEventListener('mouseup', mouse_down)
  cb.addEventListener('touchmove', mouse_down)
}

setGameUp()