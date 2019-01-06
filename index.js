module.exports = function LobbyCommand(mod) {
	const command = mod.command || mod.require.command;

    command.add(['lobby', 'logout'], () => {
        mod.send('C_RETURN_TO_LOBBY', 1, {});
		
		// code from valkyr1e-tera's "relog"
		let prepareLobbyHook;
		// make sure that the client is able to log out
		prepareLobbyHook = mod.hookOnce('S_PREPARE_RETURN_TO_LOBBY', 1, () => {
			mod.send('S_RETURN_TO_LOBBY', 1, {});
		})

		// hook timeout, in case something goes wrong
		setTimeout(() => {
			for (const hook of [prepareLobbyHook])
				if (hook)
					mod.unhook(hook);
		}, 16000)
		
    });
}
