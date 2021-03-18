<script lang="ts">
	import { onMount } from 'svelte'
	import './reset.css'

	export const name: string = ''

	function postMessage() {
		parent.postMessage(
			{
				pluginMessage: {
					type: 'buttonPressed',
				},
			},
			'*'
		)
	}

	onMount(() => {
		window.onmessage = (event) => {
			const message = event.data.pluginMessage
		}
	})
</script>

<main>
	<p>Hello Figma</p>
	<button
		on:click={() => {
			postMessage()
		}}>Press me</button>
</main>

<style global>
	p {
		color: red;
	}
</style>
