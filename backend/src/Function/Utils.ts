import User from "../Model/User"
import { Request } from "express"
import jwt , { JwtPayload } from "jsonwebtoken"

interface AuthTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export async function verifyJWT ( req: Request ){

	try {
		const { authorization } = req.headers
		const authKey = authorization?.split(' ')[1] || ''

		const token = jwt.verify( authKey , process.env.JWT_SECRET!) as AuthTokenPayload

		if (!token) throw new Error('Unauthorized attempt declined' )

		const user = await User.findById( token.id )

		if (!user) throw new Error( 'User account not found' )

		return user
	} catch {
		throw new Error('Failed to authorize user. Try again later' )
	}
}

export function HomePage ( clientUrl: string ) {
	return (`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Donnut-Nodes - Analytics Platform for Xandeum pNodes</title>
			<style>
					:root {
							--white: #ffffff;
							--black: #1a1a1a;
							--background: #f8f9ff;
							--error: #ef4444;
							--sweet: #8b5cf6;
							--compliment: #d1d5db;
							--highlight: #4f46e5;
							--brilliant: #7c3aed;
							--nodespack: #f3f4f6;
							--mild-dark: rgba(0, 0, 0, 0.1);
							--translucent: #6b7280;
							--glow-start: rgba(79, 70, 229, 0.1);
							--glow-end: rgba(124, 58, 237, 0.05);
					}
					
					* {
							margin: 0;
							padding: 0;
							box-sizing: border-box;
					}
					
					body {
							font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
							color: var(--black);
							min-height: 100vh;
							display: flex;
							flex-direction: column;
							overflow-x: hidden;
							position: relative;
							background: linear-gradient(135deg, var(--background) 0%, #f0f2ff 100%);
					}
					
					/* Animated Background Elements */
					.background-container {
							position: fixed;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							z-index: -1;
							overflow: hidden;
							pointer-events: none;
					}
					
					.floating-shapes {
							position: absolute;
							width: 100%;
							height: 100%;
					}
					
					.shape {
							position: absolute;
							border-radius: 50%;
							background: radial-gradient(circle, var(--glow-start), var(--glow-end));
							filter: blur(40px);
							opacity: 0.6;
							animation: float 20s infinite ease-in-out;
					}
					
					.shape:nth-child(1) {
							width: 400px;
							height: 400px;
							top: -100px;
							left: -100px;
							background: radial-gradient(circle, rgba(79, 70, 229, 0.15), rgba(124, 58, 237, 0.05));
							animation-delay: 0s;
					}
					
					.shape:nth-child(2) {
							width: 300px;
							height: 300px;
							top: 50%;
							right: -50px;
							background: radial-gradient(circle, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.03));
							animation-delay: -5s;
							animation-duration: 25s;
					}
					
					.shape:nth-child(3) {
							width: 250px;
							height: 250px;
							bottom: -50px;
							left: 30%;
							background: radial-gradient(circle, rgba(79, 70, 229, 0.12), rgba(124, 58, 237, 0.04));
							animation-delay: -10s;
							animation-duration: 30s;
					}
					
					.network-grid {
							position: absolute;
							width: 100%;
							height: 100%;
							background-image: 
									linear-gradient(to right, rgba(79, 70, 229, 0.03) 1px, transparent 1px),
									linear-gradient(to bottom, rgba(79, 70, 229, 0.03) 1px, transparent 1px);
							background-size: 50px 50px;
							animation: gridMove 20s linear infinite;
					}
					
					.particles {
							position: absolute;
							width: 100%;
							height: 100%;
					}
					
					.particle {
							position: absolute;
							width: 4px;
							height: 4px;
							background: var(--highlight);
							border-radius: 50%;
							opacity: 0.3;
							animation: particleMove 15s infinite linear;
					}
					
					.particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
					.particle:nth-child(2) { top: 60%; left: 80%; animation-delay: -2s; }
					.particle:nth-child(3) { top: 80%; left: 30%; animation-delay: -4s; }
					.particle:nth-child(4) { top: 40%; left: 60%; animation-delay: -6s; }
					.particle:nth-child(5) { top: 10%; left: 40%; animation-delay: -8s; }
					.particle:nth-child(6) { top: 70%; left: 20%; animation-delay: -10s; }
					
					/* Animations */
					@keyframes float {
							0%, 100% {
									transform: translate(0, 0) rotate(0deg);
							}
							25% {
									transform: translate(30px, -20px) rotate(5deg);
							}
							50% {
									transform: translate(-20px, 30px) rotate(-5deg);
							}
							75% {
									transform: translate(-30px, -10px) rotate(3deg);
							}
					}
					
					@keyframes gridMove {
							0% {
									transform: translate(0, 0);
							}
							100% {
									transform: translate(50px, 50px);
							}
					}
					
					@keyframes particleMove {
							0% {
									transform: translate(0, 0);
									opacity: 0.3;
							}
							25% {
									transform: translate(100px, -50px);
									opacity: 0.5;
							}
							50% {
									transform: translate(-50px, 100px);
									opacity: 0.3;
							}
							75% {
									transform: translate(-100px, -50px);
									opacity: 0.5;
							}
							100% {
									transform: translate(0, 0);
									opacity: 0.3;
							}
					}
					
					@keyframes pulse {
							0%, 100% {
									opacity: 0.7;
							}
							50% {
									opacity: 0.9;
							}
					}
					
					@keyframes slideIn {
							from {
									opacity: 0;
									transform: translateY(30px);
							}
							to {
									opacity: 1;
									transform: translateY(0);
							}
					}
					
					.header {
							display: flex;
							align-items: center;
							gap: 15px;
							padding: 20px 30px;
							background: rgba(255, 255, 255, 0.9);
							backdrop-filter: blur(10px);
							box-shadow: 0 2px 20px rgba(79, 70, 229, 0.1);
							border-bottom: 2px solid var(--compliment);
							position: relative;
							z-index: 10;
							animation: slideIn 0.8s ease-out;
					}
					
					.header svg {
							width: 40px;
							height: 40px;
							color: var(--highlight);
							animation: pulse 3s infinite ease-in-out;
					}
					
					.header h1 {
							margin: 0;
							font-size: 28px;
							font-weight: 800;
							background: linear-gradient(45deg, var(--highlight), var(--brilliant));
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							background-clip: text;
							position: relative;
					}
					
					.header h1::after {
							content: '';
							position: absolute;
							bottom: -5px;
							left: 0;
							width: 100%;
							height: 3px;
							background: linear-gradient(90deg, var(--highlight), transparent);
							border-radius: 3px;
					}
					
					.main-content {
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							padding: 40px 20px;
							gap: 40px;
							text-align: center;
							position: relative;
							z-index: 1;
							animation: slideIn 1s ease-out 0.2s backwards;
					}
					
					.hero-section {
							max-width: 900px;
							margin: 0 auto;
							padding: 40px;
							background: rgba(255, 255, 255, 0.85);
							backdrop-filter: blur(15px);
							border-radius: 24px;
							border: 2px solid rgba(79, 70, 229, 0.1);
							box-shadow: 0 20px 60px rgba(79, 70, 229, 0.15);
							position: relative;
							overflow: hidden;
					}
					
					.hero-section::before {
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							height: 4px;
							background: linear-gradient(90deg, var(--highlight), var(--brilliant));
							animation: slideIn 1s ease-out;
					}
					
					.hero-title {
							font-size: 48px;
							font-weight: 800;
							margin-bottom: 20px;
							background: linear-gradient(45deg, var(--highlight), var(--brilliant));
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							background-clip: text;
							line-height: 1.2;
							text-shadow: 0 4px 20px rgba(79, 70, 229, 0.2);
					}
					
					.hero-description {
							font-size: 20px;
							color: var(--translucent);
							line-height: 1.6;
							margin-bottom: 40px;
							max-width: 700px;
							margin-left: auto;
							margin-right: auto;
							position: relative;
					}
					
					.hero-description::before {
							content: '"';
							font-size: 60px;
							color: var(--highlight);
							opacity: 0.2;
							position: absolute;
							top: -30px;
							left: -20px;
							font-family: serif;
					}
					
					.features-grid {
							display: grid;
							grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
							gap: 30px;
							max-width: 1200px;
							margin: 40px auto;
							padding: 0 20px;
							position: relative;
							z-index: 2;
					}
					
					.feature-card {
							background: rgba(255, 255, 255, 0.9);
							padding: 35px;
							border-radius: 20px;
							border: 2px solid rgba(79, 70, 229, 0.1);
							transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
							position: relative;
							overflow: hidden;
							backdrop-filter: blur(10px);
					}
					
					.feature-card::before {
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							height: 4px;
							background: linear-gradient(90deg, var(--highlight), var(--brilliant));
							transform: scaleX(0);
							transform-origin: left;
							transition: transform 0.4s ease;
					}
					
					.feature-card:hover {
							transform: translateY(-10px) scale(1.02);
							border-color: var(--highlight);
							box-shadow: 0 25px 50px rgba(79, 70, 229, 0.2);
					}
					
					.feature-card:hover::before {
							transform: scaleX(1);
					}
					
					.feature-icon {
							width: 70px;
							height: 70px;
							background: linear-gradient(135deg, var(--highlight), var(--brilliant));
							border-radius: 16px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 0 auto 25px;
							position: relative;
							box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
							transition: all 0.3s ease;
					}
					
					.feature-card:hover .feature-icon {
							transform: rotate(15deg) scale(1.1);
							box-shadow: 0 15px 40px rgba(79, 70, 229, 0.4);
					}
					
					.feature-icon svg {
							width: 35px;
							height: 35px;
							color: var(--white);
					}
					
					.feature-card h3 {
							font-size: 24px;
							color: var(--highlight);
							margin-bottom: 15px;
							position: relative;
							display: inline-block;
					}
					
					.feature-card h3::after {
							content: '';
							position: absolute;
							bottom: -5px;
							left: 0;
							width: 40px;
							height: 3px;
							background: linear-gradient(90deg, var(--highlight), transparent);
							transition: width 0.3s ease;
					}
					
					.feature-card:hover h3::after {
							width: 100%;
					}
					
					.feature-card p {
							color: var(--translucent);
							line-height: 1.7;
							font-size: 16px;
					}
					
					.cta-buttons {
							display: flex;
							gap: 20px;
							justify-content: center;
							margin-top: 40px;
							flex-wrap: wrap;
					}
					
					.cta-button {
							padding: 18px 35px;
							font-size: 18px;
							font-weight: 600;
							border-radius: 15px;
							border: none;
							cursor: pointer;
							transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
							text-decoration: none;
							display: inline-flex;
							align-items: center;
							justify-content: center;
							gap: 10px;
							position: relative;
							overflow: hidden;
							z-index: 1;
					}
					
					.cta-button::before {
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							background: linear-gradient(45deg, var(--highlight), var(--brilliant));
							opacity: 0;
							transition: opacity 0.3s ease;
							z-index: -1;
					}
					
					.cta-button.primary {
							background: linear-gradient(45deg, var(--highlight), var(--brilliant));
							color: var(--white);
							box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
					}
					
					.cta-button.primary:hover {
							transform: translateY(-5px) scale(1.05);
							box-shadow: 0 20px 50px rgba(79, 70, 229, 0.4);
					}
					
					.cta-button.secondary {
							background: transparent;
							color: var(--highlight);
							border: 2px solid var(--highlight);
							position: relative;
					}
					
					.cta-button.secondary::before {
							background: linear-gradient(45deg, var(--highlight), var(--brilliant));
					}
					
					.cta-button.secondary:hover {
							color: var(--white);
							transform: translateY(-5px);
							border-color: transparent;
					}
					
					.cta-button.secondary:hover::before {
							opacity: 1;
					}
					
					.footer {
							padding: 30px;
							background: rgba(255, 255, 255, 0.9);
							backdrop-filter: blur(10px);
							border-top: 2px solid var(--compliment);
							text-align: center;
							margin-top: 60px;
							position: relative;
							z-index: 10;
					}
					
					.footer-content {
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 20px;
							max-width: 1200px;
							margin: 0 auto;
					}
					
					.footer-links {
							display: flex;
							gap: 25px;
							flex-wrap: wrap;
							justify-content: center;
					}
					
					.footer-links a {
							color: var(--highlight);
							text-decoration: none;
							font-weight: 600;
							font-size: 16px;
							padding: 8px 16px;
							border-radius: 12px;
							transition: all 0.3s ease;
							position: relative;
					}
					
					.footer-links a::before {
							content: '';
							position: absolute;
							bottom: 0;
							left: 50%;
							width: 0;
							height: 2px;
							background: linear-gradient(90deg, var(--highlight), var(--brilliant));
							transition: all 0.3s ease;
							transform: translateX(-50%);
					}
					
					.footer-links a:hover {
							background: rgba(79, 70, 229, 0.1);
							transform: translateY(-2px);
					}
					
					.footer-links a:hover::before {
							width: 80%;
					}
					
					.footer-copyright {
							color: var(--translucent);
							font-size: 14px;
							margin-top: 10px;
							opacity: 0.8;
					}
					
					/* Glow effects */
					.glow {
							position: absolute;
							width: 200px;
							height: 200px;
							border-radius: 50%;
							background: radial-gradient(circle, var(--highlight), transparent 70%);
							filter: blur(60px);
							opacity: 0.15;
							z-index: -1;
							animation: glowMove 8s infinite ease-in-out;
					}
					
					.glow-1 { top: 10%; left: 10%; animation-delay: 0s; }
					.glow-2 { top: 60%; right: 10%; animation-delay: -2s; }
					.glow-3 { bottom: 20%; left: 40%; animation-delay: -4s; }
					
					@keyframes glowMove {
							0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
							33% { transform: translate(30px, -20px) scale(1.1); opacity: 0.2; }
							66% { transform: translate(-20px, 30px) scale(0.9); opacity: 0.1; }
					}
					
					/* Responsive styles */
					@media (max-width: 768px) {
							.header {
									padding: 15px 20px;
							}
							
							.header h1 {
									font-size: 24px;
							}
							
							.hero-title {
									font-size: 36px;
							}
							
							.hero-description {
									font-size: 18px;
							}
							
							.features-grid {
									grid-template-columns: 1fr;
									padding: 0 15px;
							}
							
							.cta-buttons {
									flex-direction: column;
									align-items: center;
							}
							
							.cta-button {
									width: 100%;
									max-width: 300px;
							}
							
							.footer-links {
									gap: 15px;
									flex-direction: column;
							}
					}
					
					@media (max-width: 480px) {
							.header {
									padding: 12px 15px;
							}
							
							.header svg {
									width: 32px;
									height: 32px;
							}
							
							.header h1 {
									font-size: 20px;
							}
							
							.hero-title {
									font-size: 28px;
							}
							
							.hero-description {
									font-size: 16px;
							}
							
							.feature-card {
									padding: 25px;
							}
							
							.feature-icon {
									width: 60px;
									height: 60px;
							}
							
							.feature-icon svg {
									width: 30px;
									height: 30px;
							}
					}
			</style>
	</head>
	<body>
			<!-- Animated Background -->
			<div class="background-container">
					<div class="floating-shapes">
							<div class="shape"></div>
							<div class="shape"></div>
							<div class="shape"></div>
					</div>
					<div class="network-grid"></div>
					<div class="particles">
							<div class="particle"></div>
							<div class="particle"></div>
							<div class="particle"></div>
							<div class="particle"></div>
							<div class="particle"></div>
							<div class="particle"></div>
					</div>
					<div class="glow glow-1"></div>
					<div class="glow glow-2"></div>
					<div class="glow glow-3"></div>
			</div>

			<!-- Header -->
			<header class="header">
					<svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 -960 960 960">
							<path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z"/>
					</svg>
					<h1>Donnut-Nodes</h1>
			</header>

			<!-- Main Content -->
			<main class="main-content">
					<div class="hero-section">
							<h1 class="hero-title">Analytics Platform for Xandeum pNodes</h1>
							<p class="hero-description">
									Track, analyze, and compare pNode performance across the Xandeum network. 
									Monitor uptime, storage metrics, and network health in real-time with our advanced analytics dashboard.
							</p>
							
							<div class="cta-buttons">
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" class="cta-button primary">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
													<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
											</svg>
											Go to Dashboard
									</a>
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/docs" class="cta-button secondary">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
													<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
											</svg>
											View Documentation
									</a>
							</div>
					</div>

					<div class="features-grid">
							<div class="feature-card">
									<div class="feature-icon">
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
											</svg>
									</div>
									<h3>Real-time Monitoring</h3>
									<p>Track pNode performance with live updates, historical data analysis, and instant alerts for network changes.</p>
							</div>
							
							<div class="feature-card">
									<div class="feature-icon">
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
													<path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
											</svg>
									</div>
									<h3>Advanced Analytics</h3>
									<p>Comprehensive metrics including uptime, storage usage, network efficiency, and performance scoring.</p>
							</div>
							
							<div class="feature-card">
									<div class="feature-icon">
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
													<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
											</svg>
									</div>
									<h3>Smart Comparison</h3>
									<p>Compare multiple pNodes side-by-side with detailed insights and performance benchmarks.</p>
							</div>
					</div>
			</main>

			<!-- Footer -->
			<footer class="footer">
					<div class="footer-content">
							<div class="footer-links">
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}">Dashboard</a>
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/nodes">PNodes Viewer</a>
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/compare">Compare Nodes</a>
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/docs">Documentation</a>
									<a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/signin">Sign In</a>
							</div>
							<div class="footer-copyright">
									&copy; 2024 Donnut-Nodes. Advanced pNode Analytics Platform.
							</div>
					</div>
			</footer>
		</body>
		</html>`
	)
}