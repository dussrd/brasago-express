import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateBranchDto, PatchBranchDto, UpdateBranchDto } from "./dto";
import { BranchesService } from "./branches.service";

/**
 * Capa Controller del feature Branches.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class BranchesController extends BaseController {
  public constructor(
    private readonly service: BranchesService = new BranchesService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branches = await this.service.getAll();
      res.status(200).json({ branches });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.getOne(this.paramId(req));
      res.status(200).json({ branch });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.create(req.body as CreateBranchDto);
      res.status(201).json({ branch });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateBranchDto
      );
      res.status(200).json({ branch });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchBranchDto
      );
      res.status(200).json({ branch });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Branch permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Branch deactivated (logical delete)", branch });
    });
  }
}
