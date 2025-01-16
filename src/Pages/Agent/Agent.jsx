import React, { useEffect, useState } from "react";
import "./Agent.css";
import Hero_Section from "../../Component/Hero_Section/Hero_Section";
import Agent_Card from "../../Component/Agent_Card/Agent_Card";
import { secureinstance } from "../../Interceptor/Interceptor";
import CryptoJS from 'crypto-js';

const Agent = () => {
	const [agentdetails, setAgentDetails] = useState([]);
	const userId = localStorage.getItem("userId");
	const role = localStorage.getItem("userrole");
	const secretkey="udhgiuhgiufdhgiuh";

	useEffect(() => {
		const fetchAgent = async () => {
			try {
				const response = await secureinstance.get("/agent/getagent");
				setAgentDetails(response.data); // Set the data from the response
			} catch (err) {
				console.log("Error fetching agent details:", err.message);
			}
		};
		fetchAgent();
	}, []);

	const handleChat = (agentId,agentdetails) => {
		if (userId === agentId) {
			alert("You cannot chat with yourself!");
			return;
		}
		const hashedAgentId = CryptoJS.AES.encrypt(agentId, secretkey).toString();
		const base64Encrypted = encodeURIComponent(hashedAgentId);
		window.location.href = `/chat?receiverId=${base64Encrypted}&username=${agentdetails.username}`;
	};

	return (
		<div className="parent_agent">
			<Hero_Section pagename="Our Agents" />
			<div className="home_agent_card_detail container">
				{agentdetails.map((agent, index) => (
					<Agent_Card
						key={index}
						agent={agent}
						isSelf={userId === agent._id}
						onChat={() => handleChat(agent._id,agent)}
					/>
				))}
			</div>
		</div>
	);
};

export default Agent;
