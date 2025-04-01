using Microsoft.AspNetCore.SignalR;

namespace stockman.Hubs
{
    public class CallHub : Hub
    {
        public async Task SendMessage(string message)
        {
            // Envia uma mensagem para todos os clientes conectados
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
