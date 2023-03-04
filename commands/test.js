const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        /* [commands] https://discordjs.guide/interactions/slash-commands.html#command-options */
        .setName('test')
        .setDescription('testing')
        .addStringOption(option => option.setName('input')
                                         .setDescription('Enter a string')
                                         .setRequired(true))
                                         
        .addIntegerOption(option=> option.setName('value')
                                         .setDescription('enter a number')
                                         .setRequired(true))
        ,
        async execute(interaction) { 
              // console.log(interaction);   
              const s_value = interaction.options.getString('input');
              const n_value = interaction.options.getInteger('value'); 

              const e_value = s_value + n_value.toString();
              await interaction.channel.send(e_value);
              await interaction.reply({ content: 'message sended', ephemeral: true}); 
        },
};