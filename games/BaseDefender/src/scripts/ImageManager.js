/**
 * Images manager
 * bitmap: [x, y, width, height, regX, regY]
 * frame: [image, label, x, y, width, height, regX, regY, gotoFrame, pauseFrames, stop]
 */
ImageManager = [];
(function(scope) {
 
	var ns = scope;
	var game = ns.game ;

	ImageManager.init = function()
	{	
		this._icon = {
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
		} 
		
		this._digit = {
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
		} 
		
		this._darkdigit = {
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
		} 
		
		this._eng = {
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
		} 
		
		this._gatling = {
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
		} 
		this._gatling_attack1 = {
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
				"attack1": [0,12,"attack1", 60] 
			}
		} 
		
		this._soldier  = {
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
				"deathRightForwards": [33,48,"deathRightForwards"] ,
				"deathRightBackwards": [49,64,"deathRightBackwards"] ,
				"deathTopForwards": [65,80,"deathTopForwards"] ,
				"deathDownBackwards": [81,96,"deathDownBackwards"]  
			}
		} 
/*
		ImageManager.icon = 
		{
			src: ImageManager[5],
			healthRed: [0, 0, 40, 3],
			healthGreen: [0, 3, 40, 3],
			money: [5, 10, 51, 57],
			life: [5, 75, 58, 54],		
			sellIcon: [218, 0, 86, 80, 43, 40],
			upgradeIcon: [305, 0, 82, 80, 41, 40],
			upgradeDisabledIcon: [387, 0, 82, 80, 41, 40],
			
			gatlingIcon: [
				new Frame(new Bitmap(ImageManager[5], [140, 0, 77, 79])),
				new Frame(new Bitmap(ImageManager[5], [62, 0, 77, 79]))],
			control: [
				new Frame(new Bitmap(ImageManager[5], [40, 135, 34, 34])),
				new Frame(new Bitmap(ImageManager[5], [0, 135, 36, 39]))],
			fastForward: [
				new Frame(new Bitmap(ImageManager[5], [74, 140, 42, 30])),
				new Frame(new Bitmap(ImageManager[5], [120, 140, 45, 35]))]
		};
		
		ImageManager.font = 
		{		
			digit: [
			new Frame(new Bitmap(ImageManager[4], [119, 48, 26, 31, 12, 20])),
			new Frame(new Bitmap(ImageManager[4], [182, 4, 19, 31, 9, 20])),
			new Frame(new Bitmap(ImageManager[4], [153, 47, 24, 31, 11, 20])),
			new Frame(new Bitmap(ImageManager[4], [209, 4, 25, 31, 12, 20])),
			new Frame(new Bitmap(ImageManager[4], [129, 87, 26, 31, 12, 20])),
			new Frame(new Bitmap(ImageManager[4], [185, 43, 25, 31, 12, 21])),
			new Frame(new Bitmap(ImageManager[4], [163, 86, 26, 31, 12, 21])),
			new Frame(new Bitmap(ImageManager[4], [218, 43, 24, 31, 11, 21])),
			new Frame(new Bitmap(ImageManager[4], [197, 82, 26, 31, 12, 21])),
			new Frame(new Bitmap(ImageManager[4], [4, 121, 26, 30, 12, 20]))],		
			
			darkdigit: [
			new Frame(new Bitmap(ImageManager[4], [165, 427, 27, 35, 13, 20])),
			new Frame(new Bitmap(ImageManager[4], [140, 464, 19, 34, 9, 19])),		
			new Frame(new Bitmap(ImageManager[4], [196, 427, 26, 34, 13, 19])),		
			new Frame(new Bitmap(ImageManager[4], [163, 466, 26, 34, 13, 19])),		
			new Frame(new Bitmap(ImageManager[4], [139, 504, 27, 34, 13, 19])),		
			new Frame(new Bitmap(ImageManager[4], [223, 427, 25, 33, 13, 19])),		
			new Frame(new Bitmap(ImageManager[4], [193, 466, 27, 34, 13, 20])),		
			new Frame(new Bitmap(ImageManager[4], [170, 504, 26, 34, 12, 20])),
			new Frame(new Bitmap(ImageManager[4], [224, 465, 25, 34, 12, 20])),
			new Frame(new Bitmap(ImageManager[4], [200, 504, 27, 35, 13, 20]))],
			
			eng: {
			A: new Frame(new Bitmap(ImageManager[4], [91, 150, 29, 31, 13, 21])),		
			B: new Frame(new Bitmap(ImageManager[4], [128, 126, 29, 31, 11, 21])),		
			C: new Frame(new Bitmap(ImageManager[4], [74, 189, 27, 31, 13, 21])),		
			D: new Frame(new Bitmap(ImageManager[4], [165, 125, 28, 31, 11, 21])),		
			E: new Frame(new Bitmap(ImageManager[4], [128, 165, 26, 32, 12, 21])),		
			F: new Frame(new Bitmap(ImageManager[4], [201, 121, 26, 31, 12, 21])),		
			G: new Frame(new Bitmap(ImageManager[4], [162, 165, 28, 31, 13, 21])),		
			H: new Frame(new Bitmap(ImageManager[4], [109, 205, 30, 30, 11, 20])),		
			I: new Frame(new Bitmap(ImageManager[4], [231, 82, 20, 30, 12, 20])),		
			J: new Frame(new Bitmap(ImageManager[4], [147, 205, 26, 31, 13, 20])),		
			K: new Frame(new Bitmap(ImageManager[4], [201, 160, 31, 31, 12, 21])),		
			L: new Frame(new Bitmap(ImageManager[4], [181, 204, 25, 31, 11, 21])),		
			M: new Frame(new Bitmap(ImageManager[4], [214, 199, 32, 32, 12, 21])),		
			N: new Frame(new Bitmap(ImageManager[4], [4, 234, 29, 31, 12, 21])),		
			O: new Frame(new Bitmap(ImageManager[4], [41, 234, 28, 30, 12, 20])),		
			P: new Frame(new Bitmap(ImageManager[4], [4, 273, 27, 31, 11, 21])),		
			Q: new Frame(new Bitmap(ImageManager[4], [39, 273, 29, 32, 13, 20])),		
			R: new Frame(new Bitmap(ImageManager[4], [76, 272, 30, 31, 11, 20])),		
			S: new Frame(new Bitmap(ImageManager[4], [4, 312, 25, 32, 12, 21])),
			T: new Frame(new Bitmap(ImageManager[4], [37, 313, 28, 31, 12, 21])),
			U: new Frame(new Bitmap(ImageManager[4], [4, 352, 29, 31, 12, 21])),
			V: new Frame(new Bitmap(ImageManager[4], [73, 313, 28, 32, 12, 21])),		
			W: new Frame(new Bitmap(ImageManager[4], [114, 244, 35, 30, 13, 20])),		
			X: new Frame(new Bitmap(ImageManager[4], [4, 391, 29, 31, 13, 21])),		
			Y: new Frame(new Bitmap(ImageManager[4], [114, 282, 28, 31, 13, 21])),		
			Z: new Frame(new Bitmap(ImageManager[4], [157, 244, 25, 31, 12, 21])),
			em: new Frame(new Bitmap(ImageManager[4], [4, 4, 16, 31, 11, 20])) }
		};
		
		ImageManager.gatling = 
		{	
			//idle level1 (right side)
			idle1: [ 
			new Frame(new Bitmap(ImageManager[1], [2, 2, 108, 127, 55, 62]), null, 20),
			new Frame(new Bitmap(ImageManager[1], [114, 2, 107, 126, 54, 61]), null, 21),
			new Frame(new Bitmap(ImageManager[1], [225, 2, 108, 125, 55, 60]), null, 22),
			new Frame(new Bitmap(ImageManager[1], [337, 2, 108, 123, 55, 58]), null, 23),
			new Frame(new Bitmap(ImageManager[1], [2, 133, 107, 120, 54, 55]), null, 24),
			new Frame(new Bitmap(ImageManager[1], [113, 133, 107, 116, 54, 51]), null, 25),
			new Frame(new Bitmap(ImageManager[1], [225, 131, 108, 111, 55, 46]), null, 26),
			new Frame(new Bitmap(ImageManager[1], [337, 129, 108, 111, 55, 46]), null, 27),
			new Frame(new Bitmap(ImageManager[1], [2, 257, 107, 111, 54, 46]), null, 28),
			new Frame(new Bitmap(ImageManager[1], [113, 253, 108, 111, 55, 46]), null, 29),
			new Frame(new Bitmap(ImageManager[1], [2, 372, 108, 111, 55, 46]), null, 30),
			new Frame(new Bitmap(ImageManager[1], [225, 246, 108, 111, 55, 46]), null, 31),
			new Frame(new Bitmap(ImageManager[1], [114, 368, 108, 111, 55, 46]), null, 32),
			new Frame(new Bitmap(ImageManager[1], [337, 244, 107, 111, 54, 46]), null, 33),
			new Frame(new Bitmap(ImageManager[1], [226, 361, 108, 111, 55, 46]), null, 34),
			new Frame(new Bitmap(ImageManager[1], [338, 359, 108, 111, 55, 46]), null, 35),
			new Frame(new Bitmap(ImageManager[1], [449, 2, 107, 111, 54, 46]), null, 36),
			new Frame(new Bitmap(ImageManager[1], [560, 2, 108, 111, 55, 46]), null, 37),
			new Frame(new Bitmap(ImageManager[1], [449, 117, 108, 111, 55, 46]), null, 38)],
			
			//attack level1
			attack1: [
			new Frame(new Bitmap(ImageManager[1], [898, 550, 108, 148, 55, 83]), null, 1),
			new Frame(new Bitmap(ImageManager[1], [786, 700, 107, 148, 54, 83]), null, 2),
			new Frame(new Bitmap(ImageManager[1], [671, 856, 107, 147, 54, 82]), null, 3),
			new Frame(new Bitmap(ImageManager[1], [897, 702, 107, 144, 54, 79]), null, 4),
			new Frame(new Bitmap(ImageManager[1], [782, 852, 107, 140, 54, 75]), null, 5),
			new Frame(new Bitmap(ImageManager[1], [893, 852, 112, 134, 55, 69]), null, 6),
			new Frame(new Bitmap(ImageManager[2], [2, 2, 119, 127, 55, 62]), null, 7),
			new Frame(new Bitmap(ImageManager[2], [125, 2, 123, 119, 55, 54]), null, 8),
			new Frame(new Bitmap(ImageManager[2], [2, 133, 125, 111, 55, 46]), null, 9),
			new Frame(new Bitmap(ImageManager[2], [252, 2, 124, 111, 54, 46]), null, 10),
			new Frame(new Bitmap(ImageManager[2], [131, 125, 125, 111, 55, 46]), null, 11),
			new Frame(new Bitmap(ImageManager[2], [380, 2, 124, 111, 55, 46]), null, 12),
			new Frame(new Bitmap(ImageManager[2], [260, 117, 119, 111, 54, 46]), null, 13),
			new Frame(new Bitmap(ImageManager[2], [383, 117, 114, 111, 54, 46]), null, 14),
			new Frame(new Bitmap(ImageManager[2], [2, 248, 108, 111, 54, 46]), null, 15),
			new Frame(new Bitmap(ImageManager[2], [114, 248, 107, 111, 54, 46]), null, 16),
			new Frame(new Bitmap(ImageManager[2], [2, 363, 108, 111, 55, 46]), null, 17),
			new Frame(new Bitmap(ImageManager[2], [225, 240, 108, 111, 55, 46]), null, 18),
			new Frame(new Bitmap(ImageManager[2], [114, 363, 107, 111, 54, 46]), null, 19)]
		};
		
		ImageManager.soldier = 
		{		
			//anim move_090
			walkRight: [
			new Frame(new Bitmap(ImageManager[3], [155, 64, 38, 53, 15, 39])),
			new Frame(new Bitmap(ImageManager[3], [197, 60, 34, 57, 12, 41])),
			new Frame(new Bitmap(ImageManager[3], [2, 122, 32, 58, 15, 42])),
			new Frame(new Bitmap(ImageManager[3], [38, 123, 37, 55, 20, 41])),
			new Frame(new Bitmap(ImageManager[3], [79, 123, 36, 53, 16, 40])),
			new Frame(new Bitmap(ImageManager[3], [43, 182, 38, 53, 17, 40])),	
			new Frame(new Bitmap(ImageManager[3], [119, 122, 36, 55, 16, 41])),
			new Frame(new Bitmap(ImageManager[3], [85, 181, 35, 57, 18, 42])),
			new Frame(new Bitmap(ImageManager[3], [159, 121, 37, 57, 19, 41])),
			new Frame(new Bitmap(ImageManager[3], [200, 121, 38, 55, 18, 40])),
			new Frame(new Bitmap(ImageManager[3], [124, 182, 34, 53, 12, 39]), null, 1)],
			
			//anim move_000
			walkTop: [
			new Frame(new Bitmap(ImageManager[3], [2, 2, 24, 57, 13, 41])),		
			new Frame(new Bitmap(ImageManager[3], [30, 2, 25, 56, 12, 42])),		
			new Frame(new Bitmap(ImageManager[3], [59, 2, 29, 56, 16, 42])),		
			new Frame(new Bitmap(ImageManager[3], [92, 2, 31, 55, 18, 40])),		
			new Frame(new Bitmap(ImageManager[3], [2, 63, 30, 55, 19, 39])),		
			new Frame(new Bitmap(ImageManager[3], [36, 62, 25, 55, 15, 39])),		
			new Frame(new Bitmap(ImageManager[3], [94, 61, 27, 57, 17, 42])),		
			new Frame(new Bitmap(ImageManager[3], [127, 2, 29, 58, 18, 42])),		
			new Frame(new Bitmap(ImageManager[3], [160, 2, 29, 56, 16, 40])),		
			new Frame(new Bitmap(ImageManager[3], [125, 64, 26,54, 13, 39])),	
			new Frame(new Bitmap(ImageManager[3], [193, 2, 25, 54, 13, 40]), null, 12)],
			
			walkDown: [
			new Frame(new Bitmap(ImageManager[3], [162, 182, 23, 58, 12, 33])),		
			new Frame(new Bitmap(ImageManager[3], [189, 182, 26, 59, 15, 35])),		
			new Frame(new Bitmap(ImageManager[3], [219, 180, 29, 58, 14, 37])),		
			new Frame(new Bitmap(ImageManager[3], [235, 2, 31, 56, 14, 37])),		
			new Frame(new Bitmap(ImageManager[3], [270, 2, 30, 56, 12, 36])),		
			new Frame(new Bitmap(ImageManager[3], [304, 2, 25, 56, 11, 34])),		
			new Frame(new Bitmap(ImageManager[3], [270, 62, 27, 58, 11, 35])),		
			new Frame(new Bitmap(ImageManager[3], [333, 2, 29, 58, 12, 37])),		
			new Frame(new Bitmap(ImageManager[3], [366, 2, 29, 56, 14, 37])),		
			new Frame(new Bitmap(ImageManager[3], [301, 62, 26, 58, 14, 36])),	
			new Frame(new Bitmap(ImageManager[3], [252, 124, 24, 59, 13, 35]), null, 23)],
			
			//death common_02_090
			deathRightForwards: [
			new Frame(new Bitmap(ImageManager[3], [802, 254, 20, 60, 10, 41])),
			new Frame(new Bitmap(ImageManager[3], [911, 137, 21, 73, 10, 50])),
			new Frame(new Bitmap(ImageManager[3], [759, 310, 27, 76, 14, 52])),
			new Frame(new Bitmap(ImageManager[3], [936, 137, 32, 79, 16, 55])),
			new Frame(new Bitmap(ImageManager[3], [702, 377, 41, 75, 19, 53])),
			new Frame(new Bitmap(ImageManager[3], [972, 113, 46, 69, 16, 52])),
			new Frame(new Bitmap(ImageManager[3], [875, 241, 46, 70, 13, 52])),
			new Frame(new Bitmap(ImageManager[3], [747, 390, 43, 68, 10, 48])),
			new Frame(new Bitmap(ImageManager[3], [794, 326, 40, 64, 6, 43])),
			new Frame(new Bitmap(ImageManager[3], [925, 220, 45, 55, 3, 36])),
			new Frame(new Bitmap(ImageManager[3], [838, 326, 49, 47, 3, 32])),
			new Frame(new Bitmap(ImageManager[3], [925, 279, 57, 40, 4, 26])),
			new Frame(new Bitmap(ImageManager[3], [664, 462, 59, 37, 4, 24])),
			new Frame(new Bitmap(ImageManager[3], [857, 417, 58, 39, 5, 26])),
			new Frame(new Bitmap(ImageManager[3], [919, 406, 59, 35, 5, 24])),
			new Frame(new Bitmap(ImageManager[3], [2, 584, 59, 32, 4, 22]), null, 0, 0, 1)],
			
			//anim death_common01_090
			deathRightBackwards: [
			new Frame(new Bitmap(ImageManager[3], [144, 351, 20, 60, 11, 41])), 
			new Frame(new Bitmap(ImageManager[3], [238, 247, 28, 69, 15, 47])), 
			new Frame(new Bitmap(ImageManager[3], [93, 406, 35, 76, 19, 53])), 
			new Frame(new Bitmap(ImageManager[3], [270, 247, 42, 73, 24, 50])), 
			new Frame(new Bitmap(ImageManager[3], [168, 351, 47, 69, 29, 46])), 
			new Frame(new Bitmap(ImageManager[3], [316, 244, 52, 61, 34, 42])),  
			new Frame(new Bitmap(ImageManager[3], [132, 424, 53, 58, 35, 39])), 
			new Frame(new Bitmap(ImageManager[3], [189, 424, 50, 58, 34, 38])),  
			new Frame(new Bitmap(ImageManager[3], [243, 414, 52, 48, 34, 30])), 
			new Frame(new Bitmap(ImageManager[3], [299, 368, 54, 49, 37, 32])), 
			new Frame(new Bitmap(ImageManager[3], [426, 290, 54, 45, 38, 31])), 
			new Frame(new Bitmap(ImageManager[3], [2, 466, 55, 42, 39, 29])), 
			new Frame(new Bitmap(ImageManager[3], [359, 400, 52, 44, 37, 27])), 
			new Frame(new Bitmap(ImageManager[3], [429, 339, 53, 42, 38, 25])), 
			new Frame(new Bitmap(ImageManager[3], [301, 469, 55, 41, 39, 24])), 
			new Frame(new Bitmap(ImageManager[3], [485, 60, 55, 39, 40, 22]), null, 0, 0, 1)],
			
			//anim death_common01_000
			deathTopForwards: [
			new Frame(new Bitmap(ImageManager[3], [331, 64, 48, 53, 25, 38])),		
			new Frame(new Bitmap(ImageManager[3], [399, 2, 53, 55, 27, 36])),		
			new Frame(new Bitmap(ImageManager[3], [280, 124, 49, 56, 26, 34])),		
			new Frame(new Bitmap(ImageManager[3], [252, 187, 46, 56, 24, 31])),		
			new Frame(new Bitmap(ImageManager[3], [383, 62, 51, 52, 26, 24])),			
			new Frame(new Bitmap(ImageManager[3], [456, 2, 50, 54, 26, 25])),			
			new Frame(new Bitmap(ImageManager[3], [438, 61, 43, 56, 19, 28])),		
			new Frame(new Bitmap(ImageManager[3], [349, 179, 50, 56, 26, 28])),		
			new Frame(new Bitmap(ImageManager[3], [435, 121, 52, 53, 27, 26])),			
			new Frame(new Bitmap(ImageManager[3], [2, 245, 40, 52, 18, 23])),		
			new Frame(new Bitmap(ImageManager[3], [46, 242, 42, 50, 24, 21])),			
			new Frame(new Bitmap(ImageManager[3], [47, 296, 46, 49, 22, 19])),		
			new Frame(new Bitmap(ImageManager[3], [2, 353, 45, 53, 21, 23])),		
			new Frame(new Bitmap(ImageManager[3], [97, 295, 43, 55, 19, 25])),	
			new Frame(new Bitmap(ImageManager[3], [2, 410, 41, 52, 17, 22])),			
			new Frame(new Bitmap(ImageManager[3], [190, 297, 44, 50, 19, 20]), null, 0, 0, 1)],	
			
			//anim death_common01_180
			deathDownBackwards: [
			new Frame(new Bitmap(ImageManager[3], [569, 2, 48, 54, 25, 41])), 
			new Frame(new Bitmap(ImageManager[3], [544, 60, 52, 56, 27, 45])), 
			new Frame(new Bitmap(ImageManager[3], [621, 2, 49, 62, 25, 49])), 
			new Frame(new Bitmap(ImageManager[3], [496, 120, 44, 66, 23, 51])), 
			new Frame(new Bitmap(ImageManager[3], [544, 120, 51, 67, 28, 52])), 
			new Frame(new Bitmap(ImageManager[3], [674, 2, 51, 64, 26, 49])), 
			new Frame(new Bitmap(ImageManager[3], [600, 68, 48, 61, 25, 45])), 
			new Frame(new Bitmap(ImageManager[3], [729, 2, 41, 58, 25, 43])), 
			new Frame(new Bitmap(ImageManager[3], [543, 191, 49, 56, 25, 42])), 
			new Frame(new Bitmap(ImageManager[3], [652, 70, 50, 56, 26, 41])), 
			new Frame(new Bitmap(ImageManager[3], [706, 70, 37, 54, 26, 39])), 
			new Frame(new Bitmap(ImageManager[3], [774, 2, 40, 51, 24, 37])), 
			new Frame(new Bitmap(ImageManager[3], [644, 133, 41, 48, 20, 35])), 
			new Frame(new Bitmap(ImageManager[3], [596, 193, 44, 48, 23, 36])), 
			new Frame(new Bitmap(ImageManager[3], [689, 130, 44, 55, 27, 41])),   
			new Frame(new Bitmap(ImageManager[3], [489, 364, 42, 48, 26, 35]), null, 0, 0, 1)]		
		};*/
	}
	
	
	scope.ImageManager = ImageManager;

}(window.Atari.currentGame))	