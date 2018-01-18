$(() => {

	$('#button').click(function(){
		document.querySelector('.message').innerHTML = ""						
		playGame();
		$(this).hide()
	})
	function playGame(){

		var slaying = true;
		var dragonLife = 100
		var knightLife = 100
		$('.dragon-damage-logs').html('HIT: ')										
		$('.knight-damage-logs').html('HIT: ')					
		setInterval(() => {
			var dragonHit = Math.round(Math.random() * 10)
			var knightHit = Math.round(Math.random() * 10)
			if(slaying){
				if (dragonLife <= 0) {
					$('.message').html("KNIGHT WON")
					slaying = false;
					$('#button').show()				
				} else {
					dragonLife = dragonLife - knightHit
					$('.dragon-lifebar-progress').css('width', dragonLife + '%')
					$('.dragon-lifebar-progress').html(dragonLife)
					$('.dragon-damage-logs').append(dragonHit + ' ')					
				}
				if(knightLife <= 0){
					$('.message').html("DRAGON WON")
					slaying = false;
					$('#button').show()
				} else {
					knightLife = knightLife - dragonHit
					$('.knight-lifebar-progress').css('width', knightLife + '%')
					$('.knight-lifebar-progress').html(knightLife)
					$('.knight-damage-logs').append(knightHit + ' ')					
				}
				if(knightLife <= 0 && dragonLife <= 0){
					$('.message').html("THEY BOTH DIED")													
					slaying = false;
					$('#button').show()
				}
			}
		}, 250)
	}
})