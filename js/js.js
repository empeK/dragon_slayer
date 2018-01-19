$(function () {
	
	$('.game').hide()
	$('.end-screen').hide()
	
	var selectedLevel = 0,
		selectedArmor = 0,
		selectedWeapon = 0

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
			dragonHitMax: 15,
			dragonHitMin: 10
		}
	]
	var armors = [{
			defence: 0.5
		},
		{
			defence: 0.7
		},
		{
			defence: 0.9
		}
	]

	var weapons = [{
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
		playGame(levels[selectedLevel], armors[selectedArmor], weapons[selectedWeapon])
		$('.choices').hide()
		$('.game').show()
	})

	$('.play-again').on('click', () => {
		$('.end-screen').hide()
		$('.choices').show()
	})

	function playGame(level, armor, weapon) {
		var slaying = true,
			dragonLife = level.dragonLife,
			dragonMaxLife = level.dragonLife,
			knightDefense = armor.defence,
			knightLife = 100,
			knightMaxLife = 100

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
					$('.knight-hit-logs').html('HIT:'+ knightHit)
					$('.dragon-damage-logs').html('GOT:-'+ knightHit)
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
					$('.dragon-hit-logs').html('HIT:'+dragonHit)
					$('.knight-damage-logs').html('GOT:-'+dragonHit)
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
		}, 750)

	}

	function getPercentage(maxLife, life) {
		var percentage = life * 100 / maxLife
		return percentage
	}

	function reset() {
		$('.knight-damage-logs').html('HITS: ')
		$('.dragon-damage-logs').html('HITS: ')
		slaying = false;
		$('.game').hide()
		$('.end-screen').show()
	}

})