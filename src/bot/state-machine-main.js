var fsm = new StateMachine({
  init: 'on_start',
  transitions: [
    { name: 'register',     from: 'on_start',  to: 'no_game' },
    { name: 'createGame',   from: 'no_game', to: 'in_game'  },
    { name: 'joinGame', from: 'no_game', to: 'will_join_game'    },
    { name: 'enterID', from: 'wil_join_game',    to: 'in_game' }
  ],
  methods: {
    onMelt:     function() { console.log('I melted')    },
    onFreeze:   function() { console.log('I froze')     },
    onVaporize: function() { console.log('I vaporized') },
    onCondense: function() { console.log('I condensed') }
  }
});
