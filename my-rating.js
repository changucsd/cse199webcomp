
class myRating extends HTMLElement {
  get value(){
    return this.getAttribute('value')||0;
  }

  set value(val){
    this.setAttribute('value',val);
    this.select(this.value - 1);
  }

  get number(){
    return Math.floor(Number(this.getAttribute('number'))) || 3;
  }

  set number(val){
    this.setAttribute('number',val);

    this.stars = [];

    while(this.firstChild){
      this.removeChild(this.firstChild);
    }

    let newDiv = document.createElement("div");
    // and give it some content
    let newContent = document.createTextNode(this.getAttribute('question')||'none');
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.id = 'question';
    newDiv.style.color = this.getAttribute('color')||'green';

    this.appendChild(newDiv);

    // var starList = document.createElement('div');
    // starList.id = 'starList';

    for(let i = 0; i < this.number; i ++){

      let icon = document.createElement('div');
      icon.className = 'star';
      this.appendChild(icon);
      this.stars.push(icon);
    }

    // this.appendChild(starList);

    this.value = this.value;
  }

  select (index){
    this.stars.forEach((star,i) =>{
      star.classList.toggle('full',i <= index);
    });
  }


  constructor() {

    super(); // get all your goodies from HTML elements for FREE

    this.number = this.number ;
    this.addEventListener('mousemove', e => {
        let box = this.getBoundingClientRect(),
            question_box = document.getElementById("question").getBoundingClientRect(),
            star_box = document.getElementsByClassName("star")[0].getBoundingClientRect(),
            starIndex = (e.clientX - box.left - question_box.width) / star_box.width;
        this.select(starIndex);
    });

    this.addEventListener('mouseout', () => {
        this.value = this.value;
    });

    this.addEventListener('click', e => {
        let box = this.getBoundingClientRect(),
            question_box = document.getElementById("question").getBoundingClientRect(),
            star_box = document.getElementsByClassName("star")[0].getBoundingClientRect(),
            starIndex = (e.clientX - box.left - question_box.width) / star_box.width;
            //starIndex = (e.pageX - box.left) / box.width * this.stars.length;
        let theIndex = Math.round(starIndex);
        this.value = starIndex + 1;

        /* send data to url*/

        var url = "https://api.myjson.com/bins";
        var method = "POST";
        var postData = JSON.stringify({"number":theIndex, "out of":this.stars.length});
        var shouldBeAsync = true;

        var request = new XMLHttpRequest();


        request.open(method, url, shouldBeAsync);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        request.send(postData);

        request.onload = function () {
           var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
           var responseData = request.responseText;
           alert(responseData);
           //alert("Your response is" + theIndex + " out of " + this.stars.length + "stored at:" + responseData);
        }


    });
  }

}

// window.onload = function() { ratingWidget.init(); };
window.customElements.define('he-rating', myRating);
// module.exports = myRating;
