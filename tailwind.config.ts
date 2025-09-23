import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cosmic Cat Kombat colors
				'cosmic-purple': '#6366F1',
				'cosmic-blue': '#3B82F6',
				'cosmic-cyan': '#06B6D4',
				'cosmic-pink': '#EC4899',
				'cosmic-violet': '#8B5CF6',
				'space-dark': '#0F172A',
				'space-darker': '#020617',
				'nebula-start': '#6366F1',
				'nebula-end': '#EC4899',
				'star-glow': '#FBBF24',
				'plasma': '#A855F7'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'stars': {
					'0%': { transform: 'translateY(0px)' },
					'100%': { transform: 'translateY(-100vh)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
					'50%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.8)' }
				},
				'particle-burst': {
					'0%': { 
						transform: 'scale(0) translateX(0px)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1) translateX(30px)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(0.5) translateX(60px)',
						opacity: '0'
					}
				},
				'nebula': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-cosmic': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-damage': 'bounce 1s ease-out',
				'stars': 'stars 20s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'nebula': 'nebula 8s ease-in-out infinite',
				'particle-burst': 'particle-burst 1s ease-out forwards'
			},
			fontFamily: {
				'cosmic': ['Fredoka One', 'cursive'],
				'space': ['Nunito', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;