export class LeftLine
{
	constructor(var1, var2)
	{
		this.var1 = var1;
		this.var2 = var2;
		this.content = document.createElement('div');
		if (this.var1 === null)
		{
			this.var1 = "../images/test.jpg"
		}
		if (this.var2=== null)
		{
			this.var2 = "../images/test.jpg"
		}
		this.render()
	}
	
	render()
	{
		this.content.className = "left-line__";
		this.content.innerHTML = `
		<div id="img_players_left">
			<div class="container_left">
				<div class="img_player_">
					<img src="${this.var1}" class="img_player_staylee" alt="">
				</div>
			</div>
			<div class="container_left">
				<div class="img_player_">
					<img src="${this.var2}" class="img_player_staylee" alt="">
				</div>
			</div>
		</div>
		<div id="border_right">
			<div id="border_top_left">
			</div>
			<div id="border_bottom_left">
			</div>
		</div>
		<div id="line_line">
		</div>
		`;

		
	}
}

