/**
 * Images manager
 * bitmap: [x, y, width, height, regX, regY]
 * frame: [image, label, x, y, width, height, regX, regY, gotoFrame, pauseFrames, stop]
 */
ImageManager = [];
(function(scope) {
 
	var ns = scope;
	var game = ns.game ;
	
	ImageManager =  {	
		_icon : {
			"images": ["images/other.png"],
			"frames": [ 
				[0, 0, 40, 3],
				[0, 3, 40, 3],
				[5, 10, 51, 57],
				[5, 75, 58, 54],
				[218, 0, 86, 80, 0, 43, 40],
				[305, 0, 82, 80, 0, 41, 40],
				[387, 0, 82, 80, 0, 41, 40],
				
				[140, 0, 77, 79],
				[62, 0, 77, 79],
				
				[40, 135, 34, 34],
				[0, 135, 36, 39],
				
				[74, 140, 42, 30],
				[120, 140, 45, 35]
			], 
			"animations": {  
				"healthRed": [0], 
				"healthGreen": [1], 
				"money": [2], 
				"life": [3], 
				"sellIcon": [4], 
				"upgradeIcon": [5], 
				"upgradeDisabledIcon": [6], 
				"gatlingIcon": [7,8], 
				"gatlingIcon-0": [7], 
				"gatlingIcon-1": [8], 
				"control": [9,10], 
				"control-0": [9], 
				"control-1": [10], 
				"fastForward": [11,12],
				"fastForward-0": [11],
				"fastForward-1": [12]
			}
		}, 
		
		_digit : {
			"images": ["images/font.png"],
			"frames": [ 
				[119, 48, 26, 31, 0, 12, 20],
				[182, 4, 19, 31, 0, 9, 20],
				[153, 47, 24, 31, 0, 11, 20],
				[209, 4, 25, 31, 0, 12, 20],
				[129, 87, 26, 31, 0, 12, 20],
				[185, 43, 25, 31, 0, 12, 21],
				[163, 86, 26, 31, 0, 12, 21],
				[218, 43, 24, 31, 0, 11, 21],
				[197, 82, 26, 31, 0, 12, 21],
				[4, 121, 26, 30, 0, 12, 20]
			], 
			"animations": {  
				"0": [0], 
				"1": [1], 
				"2": [2], 
				"3": [3], 
				"4": [4], 
				"5": [5], 
				"6": [6], 
				"7": [7], 
				"8": [8], 
				"9": [9]
			}
		}, 
		
		_darkdigit : {
			"images": ["images/font.png"],
			"frames": [ 
				[165, 427, 27, 35, 0, 13, 20],
				[140, 464, 19, 34, 0, 9, 19],		
				[196, 427, 26, 34, 0, 13, 19],		
				[163, 466, 26, 34, 0, 13, 19],
				[139, 504, 27, 34, 0, 13, 19],	
				[223, 427, 25, 33, 0, 13, 19],	
				[193, 466, 27, 34, 0, 13, 20],		
				[170, 504, 26, 34, 0, 12, 20],
				[224, 465, 25, 34, 0, 12, 20],
				[200, 504, 27, 35, 0, 13, 20] 
			], 
			"animations": {  
				"0": [0], 
				"1": [1], 
				"2": [2], 
				"3": [3], 
				"4": [4], 
				"5": [5], 
				"6": [6], 
				"7": [7], 
				"8": [8], 
				"9": [9]
			}
		}, 
		
		_eng : {
			"images": ["images/font.png"],
			"frames": [ 
				[91, 150, 29, 31, 0, 13, 21],		
				[128, 126, 29, 31, 0, 11, 21],	
				[74, 189, 27, 31, 0, 13, 21],	
				[165, 125, 28, 31, 0, 11, 21],	
				[128, 165, 26, 32, 0, 12, 21],
				[201, 121, 26, 31, 0, 12, 21],	
				[162, 165, 28, 31, 0, 13, 21],
				[109, 205, 30, 30, 0, 11, 20],
				[231, 82, 20, 30, 0, 12, 20],	
				[147, 205, 26, 31, 0, 13, 20],
				[201, 160, 31, 31, 0, 12, 21],
				[181, 204, 25, 31, 0, 11, 21],
				[214, 199, 32, 32, 0, 12, 21],	
				[4, 234, 29, 31, 0, 12, 21],	
				[41, 234, 28, 30, 0, 12, 20],	
				[4, 273, 27, 31, 0, 11, 21],
				[39, 273, 29, 32, 0, 13, 20],	
				[76, 272, 30, 31, 0, 11, 20],	
				[4, 312, 25, 32, 0, 12, 21],
				[37, 313, 28, 31, 0, 12, 21],
				[4, 352, 29, 31, 0, 12, 21],
				[73, 313, 28, 32, 0, 12, 21],	
				[114, 244, 35, 30, 0, 13, 20],	
				[4, 391, 29, 31, 0, 13, 21],	
				[114, 282, 28, 31, 0, 13, 21],		
				[157, 244, 25, 31, 0, 12, 21],
				[4, 4, 16, 31, 0, 11, 20]
			], 
			"animations": {  
				"A": [0], 
				"B": [1], 
				"C": [2], 
				"D": [3], 
				"E": [4], 
				"F": [5], 
				"G": [6], 
				"H": [7], 
				"I": [8], 
				"J": [9],
				"K": [10],
				"L": [11],
				"M": [12],
				"N": [13],
				"O": [14],
				"P": [15],
				"Q": [16],
				"R": [17],
				"S": [18],
				"T": [19],
				"U": [20],
				"V": [21],
				"W": [22],
				"X": [23],
				"Y": [24],
				"Z": [25],
				"em": [26],
			}
		}, 
		
		_gatling : {
			"images": ["images/gatling_01.png"],
			"frames": [ 
				[2, 2, 108, 127,0 , 55, 62],
				[114, 2, 107, 126,0 , 54, 61],
				[225, 2, 108, 125,0 , 55, 60],
				[337, 2, 108, 123,0 , 55, 58],
				[2, 133, 107, 120,0 , 54, 55],
				[113, 133, 107, 116,0 , 54, 51],
				[225, 131, 108, 111,0 , 55, 46],
				[337, 129, 108, 111,0 , 55, 46],
				[2, 257, 107, 111,0 , 54, 46],
				[113, 253, 108, 111,0 , 55, 46],
				[2, 372, 108, 111,0 , 55, 46],
				[225, 246, 108, 111,0 , 55, 46],
				[114, 368, 108, 111,0 , 55, 46],
				[337, 244, 107, 111,0 , 54, 46],
				[226, 361, 108, 111,0 , 55, 46],
				[338, 359, 108, 111,0 , 55, 46],
				[449, 2, 107, 111,0 , 54, 46],
				[560, 2, 108, 111,0 , 55, 46],
				[449, 117, 108, 111,0 , 55, 46] 
			] ,
			"animations": {  
				"idle": [0,18,"idle", 60],
			}
		}, 
		
		_gatling_attack1 : {
			"images": ["images/gatling_02.png"],
			"frames": [ 
				[2, 2, 119, 127,0 , 55, 62],
				[125, 2, 123, 119,0 , 55, 54],
				[2, 133, 125, 111,0 , 55, 46],
				[252, 2, 124, 111,0 , 54, 46],
				[131, 125, 125, 111,0 , 55, 46],
				[380, 2, 124, 111,0 , 55, 46],
				[260, 117, 119, 111,0 , 54, 46],
				[383, 117, 114, 111,0 , 54, 46],
				[2, 248, 108, 111,0 , 54, 46],
				[114, 248, 107, 111,0 , 54, 46],
				[2, 363, 108, 111,0 , 55, 46], 
				[225, 240, 108, 111,0 , 55, 46],
				[114, 363, 107, 111,0 , 54, 46] 
			] ,
			"animations": {  
				"attack1": [0,12,"attack1", 60],
				"right-atk": {
					frames: [0,8,10],
					next: "default" 
 				} 	
			}
		}, 
		
		_soldier : {
			"images": ["images/soldier_01.png"],
			"frames": [ 
				[155, 64, 38, 53,0 , 15, 39],
				[197, 60, 34, 57,0 , 12, 41],
				[2, 122, 32, 58,0 , 15, 42],
				[38, 123, 37, 55,0 , 20, 41],
				[79, 123, 36, 53,0 , 16, 40],
				[43, 182, 38, 53,0 , 17, 40],	
				[119, 122, 36, 55,0 , 16, 41],
				[85, 181, 35, 57,0 , 18, 42],
				[159, 121, 37, 57,0 , 19, 41],
				[200, 121, 38, 55,0 , 18, 40],
				[124, 182, 34, 53,0 , 12, 39],
				
				[2, 2, 24, 57,0, 13, 41],	
				[30, 2, 25, 56,0, 12, 42],	
				[59, 2, 29, 56,0, 16, 42],	
				[92, 2, 31, 55,0, 18, 40],	
				[2, 63, 30, 55,0, 19, 39],	
				[36, 62, 25, 55,0, 15, 39],	
				[94, 61, 27, 57,0, 17, 42],	
				[127, 2, 29, 58,0, 18, 42],	
				[160, 2, 29, 56,0, 16, 40],	
				[125, 64, 26,54,0, 13, 39],
				[193, 2, 25, 54,0, 13, 40],
						
				[162, 182, 23, 58,0, 12, 33],	
				[189, 182, 26, 59,0, 15, 35],	
				[219, 180, 29, 58,0, 14, 37],	
				[235, 2, 31, 56,0, 14, 37],	
				[270, 2, 30, 56,0, 12, 36],	
				[304, 2, 25, 56,0, 11, 34],	
				[270, 62, 27, 58,0, 11, 35],	
				[333, 2, 29, 58,0, 12, 37],	
				[366, 2, 29, 56,0, 14, 37],	
				[301, 62, 26, 58,0, 14, 36],
				[252, 124, 24, 59,0, 13, 35],
			
				[802, 254, 20, 60,0, 10, 41],
				[911, 137, 21, 73,0, 10, 50],
				[759, 310, 27, 76,0, 14, 52],
				[936, 137, 32, 79,0, 16, 55],
				[702, 377, 41, 75,0, 19, 53],
				[972, 113, 46, 69,0, 16, 52],
				[875, 241, 46, 70,0, 13, 52],
				[747, 390, 43, 68,0, 10, 48],
				[794, 326, 40, 64,0, 6, 43],
				[925, 220, 45, 55,0, 3, 36],
				[838, 326, 49, 47,0, 3, 32],
				[925, 279, 57, 40,0, 4, 26],
				[664, 462, 59, 37,0, 4, 24],
				[857, 417, 58, 39,0, 5, 26],
				[919, 406, 59, 35,0, 5, 24],
				[2, 584, 59, 32,0, 4, 22],
				
				[144, 351, 20, 60,0, 11, 41],
				[238, 247, 28, 69,0, 15, 47],
				[93, 406, 35, 76,0, 19, 53],
				[270, 247, 42, 73,0, 24, 50],
				[168, 351, 47, 69,0, 29, 46],
				[316, 244, 52, 61,0, 34, 42], 
				[132, 424, 53, 58,0, 35, 39],
				[189, 424, 50, 58,0, 34, 38], 
				[243, 414, 52, 48,0, 34, 30],
				[299, 368, 54, 49,0, 37, 32],
				[426, 290, 54, 45,0, 38, 31],
				[2, 466, 55, 42,0, 39, 29],
				[359, 400, 52, 44,0, 37, 27],
				[429, 339, 53, 42,0, 38, 25],
				[301, 469, 55, 41,0, 39, 24],
				[485, 60, 55, 39,0, 40, 22],
				
				[331, 64, 48, 53,0, 25, 38],		
				[399, 2, 53, 55,0, 27, 36],		
				[280, 124, 49, 56,0, 26, 34],		
				[252, 187, 46, 56,0, 24, 31],		
				[383, 62, 51, 52,0, 26, 24],			
				[456, 2, 50, 54,0, 26, 25],			
				[438, 61, 43, 56,0, 19, 28],		
				[349, 179, 50, 56,0, 26, 28],		
				[435, 121, 52, 53,0, 27, 26],			
				[2, 245, 40, 52,0, 18, 23],		
				[46, 242, 42, 50,0, 24, 21],			
				[47, 296, 46, 49,0, 22, 19],		
				[2, 353, 45, 53,0, 21, 23],		
				[97, 295, 43, 55,0, 19, 25],	
				[2, 410, 41, 52,0, 17, 22],			
				[190, 297, 44, 50,0, 19, 20],	

				[569, 2, 48, 54,0, 25, 41],
				[544, 60, 52, 56,0, 27, 45],
				[621, 2, 49, 62,0, 25, 49],
				[496, 120, 44, 66,0, 23, 51],
				[544, 120, 51, 67,0, 28, 52],
				[674, 2, 51, 64,0, 26, 49],
				[600, 68, 48, 61,0, 25, 45],
				[729, 2, 41, 58,0, 25, 43],
				[543, 191, 49, 56,0, 25, 42],
				[652, 70, 50, 56,0, 26, 41],
				[706, 70, 37, 54,0, 26, 39],
				[774, 2, 40, 51,0, 24, 37],
				[644, 133, 41, 48,0, 20, 35],
				[596, 193, 44, 48,0, 23, 36],
				[689, 130, 44, 55,0, 27, 41],  
				[489, 364, 42, 48,0, 26, 35] 		
			] ,
			"animations": {  
				"walkRight": [0,10,"walkRight"] ,
				"walkTop": [11,21,"walkTop"] ,
				"walkDown": [22,32,"walkDown"] ,
				"deathRightForwards": [33,48] ,
				"deathRightBackwards": [49,64] ,
				"deathTopForwards": [65,80] ,
				"deathDownBackwards": [81,96]  
			}
		},

		turret : {
			"images": ["images/sprites/turret/turret.png"],
			"frames": [

				[128, 279, 42, 62], 
				[430, 163, 78, 64], 
				[418, 229, 90, 61], 
				[2, 108, 68, 68], 
				[128, 201, 45, 76], 
				[2, 178, 68, 67], 
				[326, 185, 90, 61], 
				[430, 97, 78, 64], 
				[129, 357, 61, 107], 
				[2, 357, 62, 107], 
				[313, 248, 62, 107], 
				[66, 357, 61, 107], 
				[65, 247, 61, 107], 
				[249, 187, 62, 107], 
				[185, 187, 62, 107], 
				[2, 247, 61, 107], 
				[114, 104, 69, 95], 
				[2, 2, 110, 104], 
				[326, 96, 102, 87], 
				[222, 2, 104, 92], 
				[433, 2, 77, 93], 
				[328, 2, 103, 92], 
				[222, 96, 102, 89], 
				[114, 2, 106, 100]
			],
			"animations": {
				
					"light_turret_deg0":[2], 
					"light_turret_deg45":[3], 
					"light_turret_deg90":[4], 
					"light_turret_deg135":[5], 
					"light_turret_deg180":[6], 
					"light_turret_deg215":[7], 
					"light_turret_deg270":[0], 
					"light_turret_deg315":[1], 
					"light_turret_idle":[4], 
					"light_turret_atk":[2,3,4], 
					
					"tesla_deg315":[15], 
					"tesla_deg270":[8], 
					"tesla_deg215":[9], 
					"tesla_deg180":[10], 
					"tesla_deg135":[11], 
					"tesla_deg90":[12], 
					"tesla_deg45":[13], 
					"tesla_deg0":[14], 
					"tesla_idle":[12], 
					"tesla_turret_atk":[14,13,12], 
					
					"turret_deg315":[23],
					"turre_deg270":[16], 
					"turret_deg215":[17], 
					"turret_deg180":[18], 
					"turret_deg135":[19], 
					"turret_deg90":[20], 
					"turret_deg45":[21], 
					"turret_deg0":[22],
					"turret_idle":[20],
					"turret_atk":[22,21,20] 	
					
			} 
		},
		
		weapon : {
			"images": ["images/sprites/turret/weapon.png"],
			"frames": [

				[179, 884, 39, 36], 
				[168, 815, 78, 67], 
				[775, 448, 146, 141], 
				[2, 451, 58, 61], 
				[998, 26, 23, 24], 
				[557, 441, 146, 137], 
				[560, 266, 164, 173], 
				[783, 193, 196, 198], 
				[313, 2, 246, 230], 
				[783, 2, 213, 189], 
				[561, 2, 220, 196], 
				[2, 2, 309, 321], 
				[42, 930, 31, 25], 
				[175, 587, 35, 35], 
				[726, 403, 47, 44], 
				[705, 516, 63, 58], 
				[256, 765, 79, 79], 
				[224, 433, 86, 82], 
				[483, 306, 72, 73], 
				[136, 433, 86, 80], 
				[76, 867, 88, 79], 
				[168, 734, 86, 79], 
				[167, 653, 88, 79], 
				[38, 843, 36, 29], 
				[257, 653, 19, 18], 
				[998, 2, 24, 22], 
				[136, 325, 34, 37], 
				[726, 348, 49, 53], 
				[2, 515, 58, 62], 
				[484, 234, 74, 70], 
				[939, 425, 83, 84], 
				[342, 573, 92, 87], 
				[337, 782, 91, 94], 
				[675, 720, 91, 89], 
				[939, 393, 36, 29], 
				[145, 629, 94, 22], 
				[342, 662, 92, 22], 
				[76, 843, 89, 22], 
				[179, 922, 35, 21], 
				[241, 630, 35, 21], 
				[216, 922, 35, 20], 
				[313, 290, 168, 159], 
				[2, 325, 132, 124], 
				[342, 686, 91, 94], 
				[705, 449, 68, 65], 
				[275, 736, 33, 27], 
				[685, 630, 82, 88], 
				[923, 627, 96, 106], 
				[435, 731, 114, 106], 
				[444, 515, 109, 106], 
				[436, 623, 114, 106], 
				[172, 325, 135, 106], 
				[555, 580, 128, 106], 
				[38, 735, 128, 106], 
				[923, 511, 99, 114], 
				[42, 874, 32, 27], 
				[182, 945, 33, 26], 
				[310, 736, 29, 25], 
				[42, 903, 32, 25], 
				[257, 673, 19, 17], 
				[145, 653, 20, 80], 
				[136, 364, 16, 67], 
				[46, 580, 20, 48], 
				[24, 580, 20, 48], 
				[2, 580, 20, 48], 
				[42, 957, 72, 65], 
				[483, 448, 72, 65], 
				[483, 381, 72, 65], 
				[86, 580, 72, 47], 
				[278, 682, 62, 52], 
				[278, 628, 62, 52], 
				[998, 179, 20, 80], 
				[81, 630, 62, 52], 
				[17, 630, 62, 52], 
				[705, 576, 62, 52], 
				[909, 645, 12, 38], 
				[769, 591, 138, 60], 
				[213, 517, 126, 56], 
				[354, 451, 126, 55], 
				[552, 688, 121, 50], 
				[213, 580, 127, 46], 
				[777, 393, 160, 53], 
				[998, 97, 20, 80], 
				[313, 234, 169, 54], 
				[2, 685, 121, 48], 
				[769, 653, 121, 44], 
				[561, 200, 174, 64], 
				[769, 699, 121, 42], 
				[981, 343, 41, 80], 
				[981, 261, 41, 80], 
				[736, 274, 42, 72], 
				[737, 200, 42, 72], 
				[172, 515, 39, 70], 
				[160, 948, 20, 72], 
				[129, 515, 41, 57], 
				[998, 77, 21, 18], 
				[981, 214, 15, 9], 
				[998, 52, 21, 23], 
				[125, 684, 18, 17], 
				[339, 499, 13, 13], 
				[981, 193, 15, 19], 
				[325, 499, 12, 16], 
				[15, 1011, 11, 11], 
				[2, 1011, 11, 11], 
				[138, 948, 20, 72], 
				[340, 451, 12, 12], 
				[726, 276, 8, 8], 
				[726, 266, 8, 8], 
				[726, 299, 7, 7], 
				[160, 587, 13, 38], 
				[726, 286, 7, 11], 
				[125, 703, 13, 20], 
				[981, 225, 11, 32], 
				[154, 413, 12, 18], 
				[2, 735, 34, 138], 
				[116, 948, 20, 72], 
				[2, 875, 38, 134], 
				[95, 451, 32, 122], 
				[62, 451, 31, 125], 
				[909, 591, 12, 52], 
				[909, 591, 12, 52], 
				[923, 448, 11, 60], 
				[68, 580, 16, 48], 
				[909, 591, 12, 52], 
				[923, 448, 11, 60], 
				[166, 884, 11, 51], 
				[257, 692, 16, 71], 
				[154, 364, 13, 47], 
				[325, 451, 13, 46], 
				[312, 451, 11, 56], 
				[166, 884, 11, 51], 
				[166, 884, 11, 51], 
				[154, 364, 13, 47], 
				[325, 451, 13, 46], 
				[166, 884, 11, 51], 
				[2, 630, 13, 53], 
				[341, 515, 101, 56], 
				[892, 653, 13, 68], 
				[341, 515, 101, 56], 
				[892, 723, 16, 68]
			],
			"animations": {
				"explosion" : [0,1,5,6,7,8,9,10,11,2,3,4],
				"green_bullet":[12,23,34,45,55,56,57,58], 
				"pink_bullet":[59,10,14,15,16,17,18,19,20,21,22],
				"light_blue_bullet":[24,25,26,27,28,29,30,31,32,33],
				"single_beam":[35,36,37],
				"double_beam":[38,39,40],
				"sheild":[41],
				"cloud":[42],
				"shoot_button":[43],
				"cursor_button":[44],
				"grid_button":[46],
				"beam_cannon":[47,48,49,50,51,52,53,54],
				"nuclear_missile":[60,71,82],
				"shock_missile":[93,104,115],
				"drop_missile":[126,137,139,61 ],
				"turret":[65,66,67,68],
				"star_missile":[62,63,64],
				"laser_cannon_marker":[69,70,72,73,74],
				"hole_missile":[76,77,78,79,80,81,83,84,85,86,87],
				"lightenning_missile":[88,89,90,91,92,94,95,96,97,98,99,100,101,102,103,105,106,107,108,109,110,111,112,113],
				"drop_effect_missile":[114,116,117,118],
				"marker_1":[119], 
				"marker_2":[120], 
				"marker_3":[121], 
				"marker_4":[122], 
				"marker_5":[123], 
				"marker_6":[124], 
				"marker_7":[125], 
				"marker_8":[127], 
				"marker_9":[128], 
				"marker_10":[129], 
				"marker_11":[130], 
				"marker_12":[131], 
				"marker_13":[132], 
				"marker_14":[133], 
				"marker_15":[134], 
				"marker_16":[135], 
				"marker_five1":[136],
				"marker_five2":[138] 
				
			 } 
		},
		
		icons : {
			"images": ["images/sprites/icons/icons.png"],
			"frames": [

				[249, 290, 50, 50], 
				[460, 98, 50, 44], 
				[197, 310, 50, 56], 
				[2, 413, 50, 60], 
				[107, 66, 50, 57], 
				[150, 252, 50, 56], 
				[460, 51, 50, 45], 
				[408, 52, 50, 46], 
				[201, 2, 50, 54], 
				[52, 216, 50, 63], 
				[205, 182, 50, 53], 
				[54, 466, 50, 44], 
				[104, 404, 50, 58], 
				[253, 2, 50, 52], 
				[104, 135, 50, 57], 
				[104, 194, 50, 56], 
				[252, 58, 50, 52], 
				[156, 125, 50, 55], 
				[356, 54, 50, 49], 
				[257, 171, 50, 51], 
				[305, 2, 50, 50], 
				[156, 401, 50, 57], 
				[106, 464, 50, 46], 
				[2, 351, 50, 60], 
				[101, 2, 50, 62], 
				[304, 56, 50, 50], 
				[2, 284, 50, 65], 
				[258, 342, 50, 48], 
				[55, 71, 50, 62], 
				[208, 117, 50, 52], 
				[449, 144, 50, 42], 
				[310, 108, 50, 49], 
				[248, 237, 50, 51], 
				[357, 2, 50, 48], 
				[309, 165, 50, 49], 
				[409, 2, 70, 47], 
				[345, 216, 47, 48], 
				[156, 182, 47, 54], 
				[202, 238, 44, 54], 
				[49, 2, 50, 67], 
				[301, 276, 48, 48], 
				[54, 281, 43, 60], 
				[439, 235, 43, 37], 
				[409, 154, 37, 44], 
				[159, 61, 39, 55], 
				[148, 341, 47, 58], 
				[394, 255, 42, 45], 
				[260, 112, 48, 51], 
				[362, 105, 43, 47], 
				[200, 61, 50, 54], 
				[300, 224, 43, 50], 
				[153, 2, 46, 57], 
				[54, 343, 42, 60], 
				[98, 343, 48, 59], 
				[2, 475, 46, 33], 
				[351, 302, 42, 39], 
				[2, 216, 48, 66], 
				[2, 79, 51, 67], 
				[54, 148, 48, 63], 
				[54, 405, 48, 59], 
				[2, 2, 45, 75], 
				[438, 274, 42, 39], 
				[2, 148, 50, 66], 
				[394, 208, 43, 45], 
				[361, 159, 46, 47], 
				[448, 188, 44, 45], 
				[210, 426, 48, 56], 
				[158, 460, 50, 50], 
				[99, 281, 49, 58], 
				[208, 368, 48, 56], 
				[407, 105, 40, 47]
			],
			"animations": {
				
					"50px-Anti-gravity_missile":[0], 
					"50px-AntiGrav_Bubble_2":[1], 
					"50px-Baby-beehive":[2], 
					"50px-Baker&#39;s_Dozen":[3], 
					"50px-Beehive_icon":[4], 
					"50px-Chainsaw_icon":[5], 
					"50px-Earthquake":[6], 
					"50px-Freeze-Ray":[7], 
					"50px-Gamma_Star_icon":[8], 
					"50px-Goo-Globgun-Mega":[9], 
					"50px-Goo_Globgun_Icon":[10], 
					"GrapplingHook":[11], 
					"50px-Grenade-trio-2":[12], 
					"50px-Harpoon_icon":[13], 
					"50px-Invisible-Potion":[14], 
					"50px-Killer-Hamster":[15], 
					"50px-Killergoo":[16], 
					"50px-Kiss_Boodyge":[17], 
					"50px-Laser_Cannon":[18], 
					"50px-Love_note":[19], 
					"50px-MIRV_icon":[20], 
					"50px-Mallet_icon":[21], 
					"50px-Mega_MIRV_Launcher":[22], 
					"50px-Mine-Cluster":[23], 
					"50px-Ninja-Stars":[24], 
					"50px-Pistol_icon":[25], 
					"50px-Quintuplets":[26], 
					"50px-Rubber_Grenade_Old":[27], 
					"50px-Rubber_Grenade_Trio":[28], 
					"50px-Shuriken_Icon":[29], 
					"50px-Slingshot_icon":[30], 
					"50px-Smoreshot_copy":[31], 
					"50px-Teleporter2":[32], 
					"50px-Tornado-grenade":[33], 
					"50px-Trout_icon":[34], 
					"70px-Goo_Globgun_Old":[35], 
					"Anvil":[36], 
					"Baby_Napalm":[37], 
					"Baby_Nuke":[38], 
					"Cluster_Missile":[39], 
					"Cow":[40], 
					"Drill_Cluster":[41], 
					"Drill_Missile":[42], 
					"Dynamite":[43], 
					"Fireworks":[44], 
					"Game_Over_Nuke":[45], 
					"GammaBeam":[46], 
					"Gamma_Ray":[47], 
					"Goo_Globgun":[48], 
					"Grenade_Ammo":[49], 
					"Impulse_Bomb":[50], 
					"Jumbo_Missile":[51], 
					"Mega_Cluster_Grenade":[52], 
					"Mega_Nuke":[53], 
					"Minigun":[54], 
					"Missile":[55], 
					"Missile_Stream":[56], 
					"Napalm-mega":[57], 
					"Napalm":[58], 
					"Nuke":[59], 
					"Poison_Cloud_icon_2":[60], 
					"Purple_Missile":[61], 
					"Queen-Beehive":[62], 
					"Rubber_Grenade":[63], 
					"Rubber_Grenade_MIRV":[64], 
					"Scatter_MIRV":[65], 
					"Shock_Rifle_icon":[66], 
					"Shopgun":[67], 
					"Spider_Bomb_copy":[68], 
					"Tornado_Cluster":[69], 
					"Zoo_Bomb":[70]
			} 
		},
		
		yellow_digit : {
			"images": ["images/yellow_digit.png"],
			"frames": [

				[32, 80, 25, 38], 
				[59, 80, 22, 38], 
				[144, 78, 28, 36], 
				[259, 78, 27, 34], 
				[113, 78, 29, 36], 
				[2, 80, 28, 38], 
				[203, 78, 27, 36], 
				[83, 78, 28, 37], 
				[174, 78, 27, 36], 
				[232, 78, 25, 36], 
				[177, 2, 51, 74], 
				[230, 2, 44, 74], 
				[119, 2, 56, 74], 
				[502, 2, 55, 70], 
				[276, 2, 57, 72], 
				[2, 2, 56, 76], 
				[392, 2, 54, 72], 
				[60, 2, 57, 74], 
				[335, 2, 55, 72], 
				[448, 2, 52, 72], 
				[346, 76, 14, 25], 
				[330, 76, 14, 25], 
				[528, 74, 18, 21], 
				[567, 65, 14, 13], 
				[427, 76, 19, 21], 
				[1002, 2, 16, 21], 
				[526, 97, 18, 21], 
				[425, 99, 19, 21], 
				[508, 74, 18, 21], 
				[506, 99, 18, 21], 
				[488, 76, 18, 21], 
				[384, 76, 20, 21], 
				[1002, 48, 12, 21], 
				[486, 99, 18, 21], 
				[382, 99, 20, 21], 
				[1002, 25, 15, 21], 
				[333, 103, 24, 21], 
				[362, 76, 20, 21], 
				[468, 76, 18, 21], 
				[466, 99, 18, 21], 
				[310, 76, 18, 25], 
				[406, 76, 19, 21], 
				[548, 74, 17, 21], 
				[565, 97, 16, 21], 
				[404, 99, 19, 21], 
				[448, 76, 18, 21], 
				[307, 103, 24, 21], 
				[359, 103, 21, 21], 
				[546, 97, 17, 21], 
				[446, 99, 18, 21], 
				[288, 103, 17, 23], 
				[288, 76, 20, 25], 
				[559, 2, 284, 61], 
				[898, 2, 50, 59], 
				[956, 62, 40, 58], 
				[745, 65, 52, 59], 
				[635, 65, 50, 60], 
				[950, 2, 50, 58], 
				[845, 2, 51, 59], 
				[852, 63, 50, 59], 
				[904, 63, 50, 58], 
				[799, 65, 51, 59], 
				[583, 65, 50, 60], 
				[687, 65, 56, 59]
			],
			"animations": {
				
					"0":[0], 
					"1":[1], 
					"2":[2], 
					"3":[3], 
					"4":[4], 
					"5":[5], 
					"6":[6], 
					"7":[7], 
					"8":[8], 
					"9":[9], 
					"big_0":[10], 
					"big_1":[11], 
					"big_2":[12], 
					"big_3":[13], 
					"big_4":[14], 
					"big_5":[15], 
					"big_6":[16], 
					"big_7":[17], 
					"big_8":[18], 
					"big_9":[19], 
					"fuente_(":[20], 
					"fuente_)":[21], 
					"fuente_A":[22], 
					"fuente_ASTERISCO":[23], 
					"fuente_B":[24], 
					"fuente_BARRA":[25], 
					"fuente_C":[26], 
					"fuente_D":[27], 
					"fuente_E":[28], 
					"fuente_F":[29], 
					"fuente_G":[30], 
					"fuente_H":[31], 
					"fuente_I":[32], 
					"fuente_J":[33], 
					"fuente_K":[34], 
					"fuente_L":[35], 
					"fuente_M":[36], 
					"fuente_N":[37], 
					"fuente_O":[38], 
					"fuente_P":[39], 
					"fuente_Q":[40], 
					"fuente_R":[41], 
					"fuente_S":[42], 
					"fuente_T":[43], 
					"fuente_U":[44], 
					"fuente_V":[45], 
					"fuente_W":[46], 
					"fuente_X":[47], 
					"fuente_Y":[48], 
					"fuente_Z":[49], 
					"fuente_dolar":[50], 
					"fuente_�":[51], 
					"loading":[52], 
					"loading_0":[53], 
					"loading_1":[54], 
					"loading_2":[55], 
					"loading_3":[56], 
					"loading_4":[57], 
					"loading_5":[58], 
					"loading_6":[59], 
					"loading_7":[60], 
					"loading_8":[61], 
					"loading_9":[62], 
					"loading_porcentaje":[63]
			} 
		},
		
		Zombie : {
			images: ["images/sprites/Monsters/Monsters_All_noBG/Zombie_noBG.png"], 
 			frames: [
				[ 15, 12 , 38, 80 ],
				[ 75, 12 , 36, 80 ],
				[ 141, 12 , 35, 80 ],
				[ 205, 14 , 38, 82 ],
				[ 267, 12 , 37, 83 ],
				[ 332, 12 , 37, 85 ],
				
				[ 6, 126 , 41, 78 ],
				[ 64, 128 , 41, 79 ],
				[ 125, 125 , 41, 81 ],
				[ 195, 125 , 47, 80 ],
				[ 263, 129 , 52, 75 ],
				[ 338, 124 , 48, 77 ],
				[ 403, 125 , 44, 76 ],
				[ 468, 124 , 42, 79 ],
				
				[ 9, 237 , 39, 81 ],
				[ 67, 238 , 39, 82 ],
				[ 136, 235 , 39, 83 ],
				[ 200, 234 , 42, 92 ],
				[ 264, 238 , 42, 87 ],
				[ 329, 240 , 41, 88 ],
				[ 392, 240 , 39, 88 ],
				[ 459, 240 , 41, 88 ],
			 
				[ 13, 355 , 42, 87 ],
				[ 81, 351 , 41, 82 ],
				[ 145, 353 , 42, 79 ],
				[ 210, 356 , 43, 78 ],
				[ 280, 361 , 43, 80 ],
				[ 348, 367 , 51, 68 ],
				[ 419, 372 , 51, 65 ],
			 
				[ 6, 464 , 39, 80 ],
				[ 69, 465 , 45, 84 ],
				[ 136, 466 , 47, 82 ],
				[ 204, 466 , 48, 82 ],
				[ 277, 465 , 48, 83 ],
				[ 352, 468 , 51, 77 ],
				[ 425, 463 , 51, 76 ],
				
				[ 13, 582 , 51, 66 ],
				[ 83, 585 , 48, 61 ],
				[ 158, 595 , 48, 39 ],
				
				[ 235, 576 , 39, 80 ],
				[ 297, 578 , 41, 73 ],
				[ 366, 590 , 51, 50 ],
	
			], 
			animations: {
				stand: [0, 5, "stand"],
				walk_left: [6, 13, "walk_left"],
				walk_up: [14, 21, "walk_up"],
				atk_left: [22, 28, "atk_left"],
				atk_up: [29, 35, "atk_up"],
				die_left: [36, 41, false],
				die_up: [36, 41, false]
			} 
		},
		
		ZombieSlaughter :{
			"images": ["images/sprites/characters/Zombie_Slaughter.png"],
			"frames": [

				[2, 502, 49, 101], 
				[401, 302, 39, 101], 
				[2, 409, 50, 91], 
				[51, 672, 44, 93], 
				[114, 369, 50, 102], 
				[458, 98, 52, 102], 
				[54, 468, 49, 102], 
				[189, 176, 54, 98], 
				[434, 202, 56, 98], 
				[132, 271, 54, 96], 
				[59, 272, 53, 96], 
				[56, 370, 50, 96], 
				[2, 701, 40, 101], 
				[215, 419, 46, 93], 
				[293, 386, 46, 94], 
				[53, 572, 47, 98], 
				[166, 379, 47, 101], 
				[105, 473, 47, 99], 
				[243, 321, 48, 96], 
				[301, 287, 49, 97], 
				[352, 297, 47, 93], 
				[75, 170, 55, 100], 
				[182, 2, 74, 114], 
				[102, 574, 44, 101], 
				[2, 61, 71, 114], 
				[93, 58, 74, 110], 
				[169, 118, 56, 56], 
				[2, 275, 53, 50], 
				[341, 392, 37, 97], 
				[442, 302, 36, 100], 
				[2, 605, 47, 94], 
				[258, 2, 67, 100], 
				[393, 96, 63, 98], 
				[327, 99, 63, 94], 
				[188, 276, 53, 101], 
				[245, 265, 54, 54], 
				[245, 203, 54, 60], 
				[317, 195, 57, 90], 
				[459, 2, 51, 94], 
				[327, 2, 64, 95], 
				[393, 2, 64, 92], 
				[93, 2, 87, 54], 
				[2, 327, 52, 80], 
				[2, 2, 89, 57], 
				[376, 196, 56, 99], 
				[154, 482, 45, 95], 
				[258, 104, 57, 97], 
				[2, 177, 55, 96], 
				[132, 176, 55, 93]
			],
			"animations": {
				"stand":[0,5, "stand"],
				"stand_right":[6,11, "stand_right"],
				"walk_left":[12,19, "walk_left"],
				"walk_right":[20,27, "walk_right"],
				"atk_left":[28,29,30,31, 44, 32, 33, 34, 35],
				"atk_right":[36,37,38,39, 44, 40, 41, 42, 43],
				"damage":[45,47],
				"die_left":[45,46],
				"die_right":[47,48] 
				 
			} 
		}
 	}
	
	
	scope.ImageManager = ImageManager;

}(window.Atari.currentGame))	