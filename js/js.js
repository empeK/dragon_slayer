$(() => {
	$('.father').hide()
	$('.end-screen').hide()
	var levels = [{
			dragonLife: 150,
			dragonHitMax: 5,
			dragonHitMin: 0
		},

		{
			dragonLife: 200,
			dragonHitMax: 10,
			dragonHitMin: 5
		},
		{
			dragonLife: 280,
			dragonHitMax: 10,
			dragonHitMin: 15
		}
	]
	var armor = [{
			defence: 0.5
		},
		{
			defence: 0.7
		},
		{
			defence: 0.85
		}
	]

	var weapon = [{
			min: 0,
			max: 5
		},
		{
			min: 5,
			max: 10
		},
		{
			min: 10,
			max: 15
		}
	]

	$('.go').on('click', () => {

		playGame(levels[$("#level")[0].selectedIndex], armor[$("#armor")[0].selectedIndex], weapon[$("#weapon")[0].selectedIndex])
		$('.choices').hide()
		$('.father').show()
	})

	$('#button').on('click', () => {
		$('.end-screen').hide()
		$('.choices').show()
	})

	function playGame(level, armor, weapon) {
		var slaying = true
		var dragonLife = level.dragonLife
		var dragonMaxLife = level.dragonLife
		var knightDefense = armor.defence
		var knightLife = 100
		var knightMaxLife = 100
		$('.knight-damage-logs').html('HITS: ')
		$('.dragon-damage-logs').html('HITS: ')

		var game = setInterval(() => {
			var dragonHit = Math.round(Math.random() * (level.dragonHitMax - level.dragonHitMin)) + level.dragonHitMin
			var knightHit = Math.round(Math.random() * (weapon.max - weapon.min)) + weapon.min
			if (slaying) {
				if (dragonLife <= 0) {
					$('.message').css('color', 'green')					
					$('.message').html("YOU WON")
					reset()
					clearInterval(game);
				} else {
					dragonLife = dragonLife - knightHit
					$('.knight-damage-logs').append(knightHit +' ')					
					$('.dragon-lifebar-progress').css('width', getPercentage(dragonMaxLife, dragonLife) + '%')
					$('.dragon-lifebar-progress').html(dragonLife)
					
				}
				if (knightLife <= 0) {
					$('.message').css('color', 'red')					
					$('.message').html("DRAGON ATE YOU")
					reset()
					clearInterval(game);
				} else {
					knightLife = Math.floor(knightLife - ((1 - knightDefense) * dragonHit))
					$('.dragon-damage-logs').append(dragonHit +' ')					
					$('.knight-lifebar-progress').css('width', getPercentage(knightMaxLife, knightLife) + '%')
					$('.knight-lifebar-progress').html(knightLife)
				}
				if (knightLife <= 0 && dragonLife <= 0) {
					$('.message').css('color', 'red')					
					$('.message').html("YOU BOTH DIED")
					reset()
					clearInterval(game);
				}
			}
		}, 500)

	}
	function getPercentage(maxLife, life){
		var percentage =  life * 100 / maxLife
		return percentage
	}
	function reset() {
		$('.knight-damage-logs').html('HITS: ')
		$('.dragon-damage-logs').html('HITS: ')
		slaying = false;
		$('.father').hide()
		$('.list').html("<p> Level: " +$("#level option:selected").text() +"<br>Armor: "+ $("#armor option:selected").text() + "<br>Weapon: " + $("#weapon option:selected").text() + "</p>")
		$('.end-screen').show()
	}

})