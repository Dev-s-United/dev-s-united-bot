const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('print server log'),
        async execute(interaction) { 
              // console.log(interaction); 
              await interaction.channel.send(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
              await interaction.reply({ content: 'message sended', ephemeral: true}); 
        },
};
