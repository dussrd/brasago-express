import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateTableDto, PatchTableDto, UpdateTableDto } from "./dto";
import { TablesService } from "./tables.service";

/**
 * Capa Controller del feature Tables.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class TablesController extends BaseController {
  public constructor(
    private readonly service: TablesService = new TablesService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const tables = await this.service.getAll();
      res.status(200).json({ tables });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const table = await this.service.getOne(this.paramId(req));
      res.status(200).json({ table });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const table = await this.service.create(req.body as CreateTableDto);
      res.status(201).json({ table });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const table = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateTableDto
      );
      res.status(200).json({ table });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const table = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchTableDto
      );
      res.status(200).json({ table });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Table permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const table = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Table deactivated (logical delete)", table });
    });
  }
}
