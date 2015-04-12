// ERRORS and WARNING

var ERR_501_NO_BOARD = "A chessboard ID needs to be set! Use cfg.boardID";
var ERR_502_NO_TITLE = "Neither title element nor titleFunction found in cfg.";
var ERR_503_NO_COMMENT = "Neither comment element nor commentFunction found in cfg";
var ERR_504_NO_MOVE_CAPTION = "Neither moveCaption element nor moveCaptionFunction found in cfg";
var ERR_505_NO_STATUS_BAR = "Neither statusBar element nor statusBarFunction found in cfg";
var ERR_506_NO_TURN = "Neither turn element nor turnFunction found in cfg";

function ChessprViewer(cfg){
	/*
	 * Declare public class variables
    */
   	var that = this;
	this.elements ={ //html elements are stored here, like the comment element
		title: undefined,
		comment: undefined,
		statusBar: undefined,
		moveCaption: undefined,
		turn: undefined,
		variant: undefined
	}; 
	var index = 0; //current index of the presentation (start with 0)
	var json = undefined; //the json script will be stored here
	this.board = undefined; //this will be the ChessBoard.js reference
	this.states = []; //here the states for the presentation will be stored
	this.defaultState = {
		comment: "",
		title: "chesspr",
		moveCaption: "",
		move: "",
		position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", //start position
		orientation: "white",
		mark: "none",
		highlightMove: false,
		variant: 0,
		turn: "white"
	};
	this.animate; //uses jquery animation to show comments/title/... (like fade In)
	this.colors = {
		move: "yellow",
		danger: "red",
		check: "red",
		pinned: "grey",
		good: "green"
	};
	
	/*
	 * load config
	 */
	
	if(typeof cfg.useDefaultIDs != undefined){
		if(cfg.useDefaultIDs === true){
			cfg.titleID = "chessprViewerTitle";
			cfg.commentID = "chessprViewerComment";
			cfg.moveCaptionID = "chessprViewerMoveCaption";
			cfg.statusBarID = "chessprViewerStatusBar";
			cfg.turnID = "chessprViewerTurn";
			cfg.boardID = "chessprViewerBoard";
			cfg.variantID = "chessprViewerVariant";
		}
	}
		//load board element	
	if(cfg.boardID){
		this.board = new ChessBoard(cfg.boardID,"start");
		this.boardID = cfg.boardID;
	}else{
		err(501,ERR_501_NO_BOARD);
	}
	if(cfg.board){
		this.board = cfg.board;
	}
		//load or create title function
	if(typeof cfg.titleID != "undefined" | typeof cfg.title != "undefined"){	
		if(typeof cfg.title != "undefined"){
			this.elements.title = cfg.title;
		}else{
			this.elements.title = $("#"+cfg.titleID)[0];
		}	
		this.setTitle = function(title){
			var ref = $(this.elements.title);
			if(this.animate && ref.html() == ""){
				ref.html(title);
				ref.fadeIn(400);
			}else{
				ref.html(title);
			}
		};	
		
	}else if(typeof cfg.titleFunction != "undefined"){
		this.setTitle = cfg.titleFunction; 
	}else{
		warn(ERR_502_NO_TITLE);
		//set void title function
		this.setTitle = function(){};
	}
		//load or create comment function
	if(typeof cfg.comment!= "undefined" | typeof cfg.commentID != "undefined"){
		if(typeof cfg.comment != "undefined"){
			this.elements.comment = cfg.comment;
		}else{
			this.elements.comment = $("#"+cfg.commentID)[0];
		}	
		this.setComment = function(comment){
			var ref = $(this.elements.comment);			
			if(this.animate == true && ref.html() == ""){
				ref.html(comment);
				ref.fadeIn(400);
			}else{
				ref.html(comment);
			}
		};
	}else if(typeof cfg.commentFunction != "undefined"){
		this.setComment = cfg.commentFunction;
	}else{
		warn(ERR_503_NO_COMMENT);
		//set void commentFunction
		this.setComment = function(){};
	}
		//load or create moveCaption function
	if(typeof cfg.moveCaption != "undefined" | typeof cfg.moveCaptionID != "undefined"){
		if(typeof cfg.moveCaption != "undefined"){
			this.elements.moveCaption = cfg.moveCaption;
		}else{
			this.elements.moveCaption = $("#"+cfg.moveCaptionID)[0];
		}	
		this.setMoveCaption = function(moveCaption){
			var ref = $(this.elements.moveCaption);			
			if(this.animate == true && ref.html() == ""){
				ref.html(moveCaption);
				ref.fadeIn(400);
			}else{
				ref.html(moveCaption);
			}
		};
	}else if(typeof cfg.moveCaptionFunction != "undefined"){
		this.setMoveCaption = cfg.moveCaptionFunction;
	}else{
		warn(ERR_504_NO_MOVE_CAPTION);
		//set void moveCaption function
		this.setMoveCaption = function(){};
	}
		//load or create statusBar function
	if(typeof cfg.statusBar != "undefined" | typeof cfg.statusBarID != "undefined"){
		if(typeof cfg.statusBar != "undefined"){
			this.elements.statusBar = cfg.statusBar;
		}else{
			this.elements.statusBar = $("#"+cfg.statusBarID);
		}	
		this.setStatusBar = function(status){
			var ref = $(this.elements.statusBar);			
			if(this.animate == true && ref.html() == ""){
				ref.html(status);
				ref.fadeIn(400);
			}else{
				ref.html(status);
			}
		};
	}else if(typeof cfg.statusBarFunction != "undefined"){
		this.setStatusBar = cfg.statusBarFunction;
		
	}else{
		warn(ERR_505_NO_STATUS_BAR);
		//set void statusBar function
		this.setStatusBar = function(){};
	}
		//load or create turn function
	if(typeof cfg.turn != "undefined" | typeof cfg.turnID != "undefined"){
		if(typeof cfg.turn != "undefined"){
			this.elements.turn = cfg.turn;
		}else{
			this.elements.turn = $("#"+cfg.turnID)[0];
		}	
		this.setTurn = function(turn){
			var ref = $(this.elements.turn);			
			if(this.animate == true && ref.html() == ""){
				ref.html(turn);
				ref.fadeIn(400);
			}else{
				ref.html(turn);
			}
		};
	}else if(typeof cfg.turnFunction != "undefined"){
		this.setTurn = cfg.turnFunction;
	}else{
		warn(ERR_506_NO_TURN);
		//set void turn function
		this.setTurn = function(turn){};		
	}
		// load or create variantFunction
	if(typeof cfg.variant != "undefined" | typeof cfg.variantID != "undefined"){
		if(typeof cfg.variant != "undefined"){
			this.elements.variant = cfg.variant;
		}else{
			this.elements.variant = $("#"+cfg.variantID)[0];
		}	
		this.setVariant = function(variant){
			var ref = $(this.elements.variant);			
			if(this.animate == true && ref.html() == ""){
				ref.html(variant);
				ref.fadeIn(400);
			}else{
				ref.html(variant);
			}
		};
	}
		//load animate boolean
	if(typeof cfg.animate != "undefined"){
		this.animate = cfg.animate;
	}else{
		this.animate = true;
	}
	
	/*
	 * Error, warn and info methods
	 */
	
	function err(code,msg){
		throw code+" chesspr viewer: "+msg;
	};
	
	function warn(msg){
		console.warn("Warning(State "+index+"): "+msg);
	};
	function info(msg){
		console.log(msg);
	};
	function status(status) {
		that.setStatusBar(status);
	}
	
	
	/*
	 *  JSON methods 
	 */
	
	function parseJSONLine(line, lastState){
		/*
		 * private functions
		 */
		function getArg(command, def){
			if(exists(command)){
				return line[command];
			}else{
				return def;
			}	
		};
		function exists(command){
			if(typeof line[command] == "undefined"){
				return false;
			}else{
				return true;
				
			}
		};
		var swapTurn = function(lastTurn){
			if(lastTurn === "white"){
				return "black";
			}
			if(lastTurn === "black"){
				return "white";
			}
			return undefined;
		};
		var getChessJSColor = function(turn){
			if(turn.toUpperCase() === "BLACK"){
				return Chess.BLACK;
			}
			if(turn.toUpperCase() === "WHITE"){
				return Chess.WHITE;
			}
			return undefined;
		};
		
		/*
		 *  variables 
		 */
		var state = {}; // this will be returned
		
		/*
		 * parse commands
		 */
		//comment
		state.comment = getArg("com","");
		//title
		state.title = getArg("title",lastState.title);
		//position
		state.position = getArg("position",lastState.position);
		//turn
		state.turn = getArg("turn",lastState.turn);
		//move and moveCaption
		if(exists("move")){
			var chess = new Chess();
			var arg = getArg("move");	
			//load chessboard last position
			chess.load(lastState.position);
			//there are 2 formats of move notation possible: Nf3 or g1-f3
			//Convert all format to the latter because chessboard.js uses it
			/*
			 * format: g1-f3
			 */
			if(stringContains(arg,"-") && 
					!stringContains(arg,"0") && ! stringContains(arg.toUpperCase(),"O")){ //to avoid castling moves
				var convertedCaption;
				var splittedMove = arg.split("-");
				state.move = arg;
				//update move caption (convert "g1-f3" --> "Nf3")
					//try to make a move
				var valid = chess.move({
					from: splittedMove[0],
					to: splittedMove[1]
				});
				if(valid){
					convertedCaption = chess.history()[0];
				}else{
					//if move wasn't valid do it without capture sign
					var piece = chess.get(splittedMove[0]).type;
					var sign="";
					//put piece to the square manually
					chess.put({type: piece, color: getChessJSColor(state.turn)},splittedMove[1]);
					piece = piece.toUpperCase();
					if(piece == "P"){
						// if piece is a pawn, do not write it into caption
						piece ="";
					}
					//add check or checkmate sign
					if(chess.in_check()){
						sign = "+";
					}
					if(chess.in_checkmate){
						sign = "#";
					}
					convertedCaption = piece+splittedMove[0]+"-"+splittedMove[1]+sign;
				}
				state.moveCaption = getArg("moveCaption",convertedCaption);				
			/*
			 * format: Nf3
			 */
			}else{ 
				var from;
				var target;
				//convert it to the format "g1-f3"
				var valid = chess.move(arg);
				if(valid){
					from = chess.history()[0].from;
					target = chess.history()[0].target;
				}else{
					//there is no way to find an unique move in each position
					//so this might be inaccurate
					var piece = arg.replace(/ /g,"").substring(0,1).toUpperCase();
					target = arg.substring(arg.indexOf(piece)).replace(/ /g,"");
					//search for the piece on the chessboard :/
					var rows = ["a","b","c","d","e","f","g","h"];
					var color = state.turn;
					for(var i=1;i<9;i++){
						for(var a=0; a<8; a++){
							var result = chess.get(a+""+i);
							if(result != null){
								if(result.type.toUpperCase()===piece && result.color === getChessJSColor(state.turn)){
									from=a+""+i;
								}
							}	
						}
					}
					if(typeof from === "undefined"){
						warn("Move "+arg+" can't be processed successfully. No source square was found! Cannot show this move.");
					}else{
						warn("Move "+arg+" can't be processed successfully. Showed move might not be correct.");
					}
					//add piece manually to position
					chess.put({type: piece.toLowerCase(), color: getChessJSColor(state.turn)},target);
				}
				state.move = from+"-"+target;
				//update move caption
				state.moveCaption = getArg("moveCaption",arg);
			}
			//swap turn
			state.turn = swapTurn(state.turn);
			//update position
			state.position = chess.fen();
			
		}else{
			state.move="";
			state.moveCaption = getArg("moveCaption",lastState.moveCaption);
		}
		//orientation
		state.orientation = getArg("orientation",lastState.orientation);
		//mark 
		if(exists("mark")){
			if(getArg("mark")==="last"){
				//use last markup
				state.mark = lastState.mark;
			}else{
				state.mark = getArg("mark");
			}
		}else{
			state.mark = "";
		}
		//HighlightMove
		state.highlightMove = getArg("highlightMove",lastState.hightlightMove);
		//Variant
		state.variant = getArg("variant",lastState.variant);
		
		return state;
	}
	

	
	
	/*
	 * Load State 
	 */
	
	function loadState(state,lastState){
		that.setTitle(state.title);
		that.setComment(state.comment);
		that.setMoveCaption(state.moveCaption);
		that.setTurn(state.turn,that);
		that.setOrientation(state.orientation);
		that.setVariant(state.variant);
		that.setMark(state.mark, lastState.mark);
		if(state.move == ""){
			if(lastState.position !== state.position){
				that.setPosition(state.position);
			}
		}else{
			that.setMove(state.move,state.highlightMove);
		}
	}
	
	function checkJSON(json){
		//TODO
		return true;
	}

	
	/*
	 * PGN methods 
	 */
	
	function parsePGN(data){
		
	}
	
	
	/*
	 * PUBLIC METHODS of CHESSPRVIEWER
	 */

/**
 * loads a json file 
 */
this.loadJSON = function(data){
	//first check JSON
	if(!checkJSON(json)){
		return false;
	}
	
	//if it's ok, then store...
	json = data;
	//...and parse it
	for(var i=0;i<json.script.length;i++){
		var lastState;
		if(i==0){
			lastState = this.defaultState;
		}else{
			lastState = this.states[i-1];
		}
		this.states[i] = parseJSONLine(json.script[i],lastState);
	}
	status("Script loaded.");
	return true;
};

/**
 *starts the presentation and load state 0
 */
this.start = function(){
	index = 0;
	loadState(this.states[0],{});
};

/**
 *loads the next state of the presentation 
 * returns false if end is reached
 */
this.next = function(){
	index++;
	if(index<this.states.length){
		loadState(this.states[index],this.states[index-1]);
		return true;
	}else{
		index=this.states.length-1;
		return false;
	}
};

this.back = function(){
	index--;
	if(index<=0){
		index = 0;
		return false;
	}else{
		loadState(this.states[index],this.states[index+1]);
		return true;
	}
};

	/*
	 *  output methods 
	 */
	
	this.setMove = function(move, highlight){
		this.board.move(move);
		//TODO highlight
	};
	

	this.setPosition = function(position){
		this.board.position(position);
	};
	
	this.setMark = function(markArgs, lastArgs){
		function getColor(parameter){
			if(typeof that.colors[parameter] != undefined){
				return that.colors[parameter];
			}else{
				return parameter;
			}
		}
		
		if(markArgs === lastArgs){ 
			//nothing to do then
			return;
		}
		//markArgs must be array
		if($.isArray(markArgs)){
			//delete markups of last state
			this.board.resize();
			//load new markup
			for(var i=0;i<markArgs.length;i++){
				var newClass = {};
				var squares;
				if(typeof markArgs[i]["background"] !== "undefined"){
					newClass["backgroundColor"] = getColor([markArgs[i]["background"]]);
				}
				if(typeof markArgs[i]["border"] !== "undefined"){
					var color = getColor([markArgs[i]["border"]]);
					newClass["-moz-box-shadow"] = "inset 0 0 3px 3px "+color;
					newClass["-webkit-box-shadow"] = "inset 0 0 3px 3px "+color;
					newClass["box-shadow"] = "inset 0 0 3px 3px "+color;
				}
				//use "square" or "squares" argument, create array when have "square"
				if(typeof markArgs[i].squares !== "undefined"){
					squares = markArgs[i].squares;
				} else if(typeof markArgs[i].square !== "undefined"){
					squares = [markArgs[i].square];
				} else{
					warn("No squares specified for markup!");
					squares = [];
				}
				//add newClass to squares
				for(var a=0;a<squares.length;a++){
					var square = squares[a];
					console.log(square);
					$("#"+this.boardID).find(".square-"+square).css(newClass);
				}
			}
		}else if(markArgs !== ""){
			warn("Markup parameter must be an array.");
		}
	};
	
	this.setOrientation = function(orientation){
		this.board.orientation(orientation);
	};


}; //ChessprViewer END

var stringContains = function(string, contains){
	if(string.indexOf(contains) == -1){
		return false;
	}else{
		return true;
	}
};



