export class RightLine
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
		this.content.className = "right-line__";
		this.content.innerHTML = `
		<div id="line_line">
		</div>
		<div id="border_right">
			<div id="border_top_right">
			</div>
			<div id="border_bottom_right">
			</div>
		</div>
		<div id="img_players_right">
			<div class="container_right">
				<div class="img_player_">
					<img src="../images/${this.var1}" class="img_player_staylee">
				</div>
			</div>
			<div class="container_right">
				<div class="img_player_">
					<img src="../images/${this.var2}" class="img_player_staylee">
				</div>
			</div>
		</div>
		`;
	}
}
