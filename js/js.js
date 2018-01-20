$(function () {

	var levels = [{
			dragonLife: 150,
			dragonHitMax: 5,
			dragonHitMin: 10
		},

		{
			dragonLife: 200,
			dragonHitMax: 5,
			dragonHitMin: 10
		},
		{
			dragonLife: 400,
			dragonHitMax: 10,
			dragonHitMin: 15
		}
	]
	var armors = [{
			defence: 0.5
		},
		{
			defence: 0.7
		},
		{
			defence: 0.8
		}
	]

	var weapons = [{
			min: 5,
			max: 10
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

	$('.game').hide()
	$('.end-screen').hide()
	
	var selectedLevel = 0,
		selectedArmor = 0,
		selectedWeapon = 0,
		dragonLife = levels[selectedLevel].dragonLife,
		knightHit = 1,
		slaying = true,
		dragonMaxLife = levels[selectedLevel].dragonLife,
		knightDefense = armors[selectedArmor].defence,
		knightLife = 100,
		knightMaxLife = 100,
		game

	$('.level').click(function () {
		if (!$(this).hasClass('level-active')) {
			$("li.level-active").removeClass("level-active");
			$(this).addClass('level-active')
			selectedLevel = $(this).attr('value')
			$('.list span').html($(this).text())
		}
	})

	$('.armor').click(function () {
		if (!$(this).hasClass('armor-active')) {
			$("li.armor-active").removeClass("armor-active");
			$(this).addClass('armor-active')
			selectedArmor = $(this).attr('value')
			$('.man-armor img').attr('src',  $(this).find('img').attr('src'))
			$('.list img:nth-child(2)').attr('src',  $(this).find('img').attr('src'))
		}
	})

	$('.weapon').click(function () {
		if (!$(this).hasClass('weapon-active')) {
			$("li.weapon-active").removeClass("weapon-active");
			$(this).addClass('weapon-active')
			selectedWeapon = $(this).attr('value')
			$('.man-sword img').attr('src',  $(this).find('img').attr('src'))			
			$('.list img:nth-child(3)').attr('src',  $(this).find('img').attr('src'))
		}
	})


	$('.go').on('click', () => {
		playGame(levels[selectedLevel], armors[selectedArmor], weapons[selectedWeapon])
		$('.choices').hide()
		$('.game').show()
	})


	$('.play-again').on('click', () => {
		$('.end-screen').hide()
		$('.choices').show()
	})
	
	$('.dragon-image-container img').on('click', () => {
		knightHit = Math.round(Math.random() * (weapons[selectedWeapon].max - weapons[selectedWeapon].min)) + weapons[selectedWeapon].min
		dragonLife = dragonLife - knightHit
		if(dragonLife <= 0){
			$('.dragon-lifebar-progress').html(0)
			$('.message').css('color', 'green')
			$('.message').html("YOU WON")
			reset()
		}else{
			$('.dragon-lifebar-progress').html(dragonLife)
			$('.knight-hit-logs').html(knightHit)
			$('.dragon-damage-logs').html('-'+ knightHit)
		}
		$('.dragon-lifebar-progress').css('width', getPercentage(dragonMaxLife, dragonLife) + '%')
	})
	
	function playGame(level, armor, weapon) {
		dragonLife = levels[selectedLevel].dragonLife,
		dragonMaxLife = levels[selectedLevel].dragonLife,
		knightDefense = armors[selectedArmor].defence,
		knightLife = 100,
		knightMaxLife = 100
		$('.knight-damage-logs').html('0')
		$('.dragon-damage-logs').html('0')
		$('.dragon-lifebar-progress').css('width', getPercentage(dragonMaxLife, dragonLife) + '%')
		$('.dragon-lifebar-progress').html(dragonLife)
		game = setInterval(() => {
			var dragonHit = Math.round(Math.random() * (level.dragonHitMax - level.dragonHitMin)) + level.dragonHitMin

				if (knightLife <= 0) {
					$('.message').css('color', 'red')
					$('.message').html("DRAGON ATE YOU")
					reset()
				} else {
					knightLife = Math.floor(knightLife - ((1 - knightDefense) * dragonHit))
					if(knightLife < 0){
						$('.knight-lifebar-progress').html(0)
					}else{
						$('.knight-lifebar-progress').html(knightLife)
					}
					$('.dragon-hit-logs').html(dragonHit)
					$('.knight-damage-logs').html('-'+dragonHit)
					$('.knight-lifebar-progress').css('width', getPercentage(knightMaxLife, knightLife) + '%')
				}
				if (knightLife <= 0 && dragonLife <= 0) {
					$('.message').css('color', 'red')
					$('.message').html("YOU BOTH DIED")
					reset()
					
				}
		}, 200)
	}

	function getPercentage(maxLife, life) {
		var percentage = life * 100 / maxLife
		return percentage
	}

	function reset() {
		$('.knight-damage-logs').html('0')
		$('.dragon-damage-logs').html('0')
		slaying = false;
		$('.game').hide()
		$('.end-screen').show()
		clearInterval(game);
	}

})