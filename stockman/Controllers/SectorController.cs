using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using stockman.Models;
using stockman.Repositories;
using stockman.Repositories.Interfaces;
using stockman.ViewModels;

namespace stockman.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SectorController : ControllerBase
{
    private readonly ISectorRepository _repository;

    public SectorController(ISectorRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    [Authorize(policy: "admin")]
    public async Task<ActionResult<Sector>> CreateAsync(CreateSectorViewModel request)
    {
        var sectorNameVerify = await _repository.GetByNameAsync(request.Name);
        if (sectorNameVerify is not null)
            return Conflict(new { message = "Nome de setor já cadastrado, tente outro nome!" });

        var sector = request.CreateSector();
        var result = await _repository.CreateAsync(sector);
        return StatusCode(201, result);
    }

    [HttpGet]
    [Authorize(policy: "user")]
    public async Task<ActionResult<IEnumerable<Sector>>> GetAllAsync()
    {
        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{sectorId:int}")]
    [Authorize(policy: "moderador")]
    public async Task<ActionResult<Sector>> GetById(int sectorId)
    {
        if (sectorId <= 0)
        {
            return BadRequest("O id para pesquisa deve ser maior que zero");
        }

        return Ok(await _repository.GetByIdAsync(sectorId));
    }

    [HttpDelete("{sectorId:int}")]
    [Authorize(policy: "admin")]
    public async Task<IActionResult> Delete(int sectorId)
    {
        if (sectorId <= 0)
        {
            return BadRequest("O id para pesquisa deve ser maior que zero");
        }

        Sector sector = await _repository.GetByIdAsync(sectorId);
        sector.Status = false;
        await _repository.DeleteAsync(sector);
        return NoContent();
    }

    [HttpPut("{sectorId:int}")]
    [Authorize(policy: "admin")]
    public async Task<IActionResult> Update(int sectorId, UpdateSectorViewModel request)
    {
        if (sectorId <= 0)
        {
            return BadRequest("O id para a atualização deve ser maior que zero!");
        }

        Sector sector = await _repository.GetByIdAsync(sectorId);
        Sector sectorUpdated = request.UpdateSector(sector);
        await _repository.UpdateAsync(sectorUpdated);

        return NoContent();
    }

    [HttpGet("search/{param}")]
    [Authorize(policy: "moderador")]
    public async Task<ActionResult> Search(string param)
    {
        var sectors = await _repository.Search(param);
        return Ok(sectors);
    }
}

