$(document).ready(function(){

	$('#play-again').hide();
	$('#hit-button').hide();
	$('#stand-button').hide();
	let deck  = newDeck();
	shuffle(deck);
	let dealerHand = [];
	let playerHand= [];
	let revealTime = 2000;
	$('#player-points').text("0");
	$('#dealer-points').text("0");


	function newDeck(){
		let cards = [];
		for (let i = 1; i <= 13; i++) {
		    cards.push({ point: i, suit: 'spades' }); 
		    cards.push({ point: i, suit: 'hearts' });
		    cards.push({ point: i, suit: 'clubs' });
		    cards.push({ point: i, suit: 'diamonds' });
		}
	  return cards;
	}
	function getCard(){
		let card = deck.pop();
		return card;
	}

	function showCard(card, element){	
		let cardName;
		console.log(card.point);
		if (card.point === 1) {
			cardName = 'ace';
		} else if (card.point === 11) {
			cardName = 'jack';
		} else if (card.point === 12) {
			cardName = 'queen';
		} else if (card.point === 13) {
			cardName = 'king';
		} else {
			cardName = card.point;
		}
		$(element).append('<img src = images/' + cardName + '_of_' + card.suit + '.png>');
		$(element).find(':last-child').hide().fadeIn(revealTime,"swing");


	}

	function shuffle(a){
	    let j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}


	function countpoints(cards){
		cards = cards.slice(0);
 		cards.sort(function(a, b) {
    		return b.point - a.point;
  		});
  		return cards.reduce(function(sum, card) {
    		let point = card.point;
    		if (point > 10) {
      			point = 10;
   			}
    		if (point === 1 && sum < 11) {
      			point = 11;
    		}
    		return sum + point;
  		}, 0);
	}

	function updatePoint(point, element){
		if(element ==="#player-points"){
			let p = countpoints(playerHand);
			$(element).text(p);
		}
		if(element ==="#dealer-points"){
			let p = countpoints(dealerHand);
			$(element).text(p);
		}
	}

	function deal(element){
		if(element ==="#dealer-hand"){

			let card = getCard();
			dealerHand.push(card);
			showCard(card, "#dealer-hand");
			updatePoint(card.point,"#dealer-points");
		}
		if(element ==="#player-hand"){
			let card = getCard();
			playerHand.push(card);
			showCard(card, "#player-hand");
			updatePoint(card.point,"#player-points");
		}
		
	}

	function reveal(){
		let card = getCard();
		dealerHand.push(card);
		let cardName;
		console.log(card.point);
		if (card.point === 1) {
			cardName = 'ace';
		} else if (card.point === 11) {
			cardName = 'jack';
		} else if (card.point === 12) {
			cardName = 'queen';
		} else if (card.point === 13) {
			cardName = 'king';
		} else {
			cardName = card.point;
		}
		$("#dealer-hand").find(':first-child').replaceWith('<img src = images/' + cardName + '_of_' + card.suit + '.png>');
		$("#dealer-hand").find(':first-child').hide().fadeIn(revealTime,"swing");

		updatePoint(card.point,"#dealer-points");	
	}


	$("#deal-button").click(function(){

		$('#dealer-hand').append('<img src = images/back.jpg>').hide().fadeIn(revealTime,"swing");
		deal("#player-hand");
		deal("#dealer-hand");
		deal("#player-hand");

		$('#stand-button').show();
		$('#hit-button').show();
		$('#deal-button').hide();

	});

	function gameOver(){
		$('#play-again').show();
		$('#hit-button').hide();
		$('#stand-button').hide();
		$('#hit-button').hide();
	}

	function check(){
		let points = [];
		points.push(countpoints(playerHand));
		points.push(countpoints(dealerHand));

		return points;
	}

	$("#hit-button").click(function(){
		deal("#player-hand");
		if(check()[0] > 21){
			$("#messages").text("You Lose!");
			$('#stand-button').hide();
			$('#hit-button').hide();
			$('#play-again').show();
		}

	});

	$("#stand-button").click(function(){
		
		let p = check()[0];
		let d = check()[1];
		$("#dealer-hand").find(':first-child').remove();
		$("#dealer-hand").find(':first-child').hide().fadeIn(revealTime,"swing");
		while(d < 17){

			deal("#dealer-hand");
			if( d > 21){
			$("#messages").text("You Win.");
				gameOver();
			}
			d = check()[1];
		}


		if(d > 21 && p<= 21){
			$("#messages").text("You Win!");
			gameOver();
		}	
		else if(p <= 21 && d >21){
			$("#messages").text("You Win!");
			gameOver();
		}

		else if(d > p){
			$("#messages").text("You Lose!");
			 gameOver();
		}

		else if(d < p){
			$("#messages").text("You Win!");
			 gameOver();	
		}
		else if(d === p){
			$("#messages").text("Draw!");
			 gameOver();	
		}

	});

	$("#play-again").click(function(){

		$('#play-again').hide();
		$('#hit-button').hide();
		$('#stand-button').hide();
		$('#deal-button').show();
		deck  = newDeck();
		shuffle(deck);
		dealerHand = [];
		playerHand= [];
		$('#player-points').text("0");
		$('#dealer-points').text("0");
		$("#messages").text("");
		$("#dealer-hand img").remove();
		$("#player-hand img").remove();


	});



});