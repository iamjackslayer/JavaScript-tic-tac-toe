function createCellArray(){
	var arr = [];
	for(row=0;row<3;row++){
		arr.push([]);
		for(cell=0;cell<3;cell++){
			arr[row].push($("div #row"+row+" #cell"+cell));
		}
	}
	return arr;
}

function checkVictory(cellArray){
	//check horizontal
	for(row=0;row<3;row++){
		if (cellArray[row][0].text() != "") {
			if((cellArray[row][0].text()==cellArray[row][1].text())&&(cellArray[row][0].text()==cellArray[row][2].text())) {
				gameOver(cellArray[row][0].text());
			}
		}
	}
	//check vertical
	for(cell=0;cell<3;cell++){
		if (cellArray[0][cell].text() != "") {
			if((cellArray[0][cell].text()==cellArray[1][cell].text())&&(cellArray[0][cell].text()==cellArray[2][cell].text())) {
				gameOver(cellArray[0][cell].text());
			}
		}
	}
	//check diagonal
	if(cellArray[1][1].text() != ""){
		if((cellArray[0][0].text()==cellArray[1][1].text())&&(cellArray[0][0].text()==cellArray[2][2].text())) {
				gameOver(cellArray[0][0].text());
		}
		if((cellArray[0][2].text()==cellArray[1][1].text())&&(cellArray[0][2].text()==cellArray[2][0].text())) {
				gameOver(cellArray[0][2].text());
		}
	}
}

function gameOver(cellArrayText){
	$('#first-row').prepend('<h1>\''+cellArrayText+'\' Guy Won!</h1>').css({
		'text-align':'center'
	});
	//make cell unable to be clicked
	$.each(cellArray,function(rowIndex,row){
		$.each(row,function(rowIndex,cell){
			cell.off('click');
		});
	});

	
}

function restart(){
	//make cell able to be clicked
	$.each(cellArray,function(rowIndex,row){
		$.each(row,function(rowIndex,cell){
			cell.one('click',function(e){
				count++;
				//for nth turn, if n is even, mark 'X', if n is odd, mark 'O'
				count%2 == 0 ? cell.text("X") : cell.text("O");

				//check for winner
				checkVictory(cellArray);
			});
		});
	});
	//reset count
	count = 0
	//clear grid
	$.each(cellArray,function(rowIndex,row){
		$.each(row,function(rowIndex,cell){
			cell.text('');
		});
	});
	//remove the heading
	$('h1').remove();
}
var cellArray;
var count = 0;
$(document).ready(function(){
	cellArray = createCellArray();
	$.each(cellArray,function(rowIndex,row){
		$.each(row,function(cellIndex,cell){
			cell.css({
				'font-size':'50px',
				'text-align':'center',
				'line-height':'100px'
			});
			cell.one('click',function(e){
				count++;
				//for nth turn, if n is even, mark 'X', if n is odd, mark 'O'
				count%2 == 0 ? cell.text("X") : cell.text("O");

				//check for winner
				checkVictory(cellArray);
			});
		});
	});

	//button event handler
	$('#restart').on('click',function(e){
		restart();
	});
});