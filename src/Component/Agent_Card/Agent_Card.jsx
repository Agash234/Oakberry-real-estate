import React from "react";
import "./Agent_Card.css";

function Agent_Card({ agent, isSelf, onChat }) {
	return (
		<div className="Agent_card_parent">
			<div className="agent_img">
				<img src={agent.images} alt={agent.username} />
			</div>
			<div className="Agent_card_detail">
				<div className="count">
					<p>LISTING</p>
					<p>{agent.property_list} Properties</p>
				</div>
				<h1>{agent.username}</h1>
				<div className="social">
					<a href="#">
						<i className="fa-brands fa-twitter"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-facebook"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-google"></i>
					</a>
					<a href="#">
						<i className="fa-brands fa-instagram"></i>
					</a>
				</div>
				<button
					className="chat_button"
					disabled={isSelf}
					onClick={onChat}
				>
					{isSelf ? "Your Profile" : "Chat"}
				</button>
			</div>
		</div>
	);
}

export default Agent_Card;
