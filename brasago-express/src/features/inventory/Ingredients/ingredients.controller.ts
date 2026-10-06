import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateIngredientDto, PatchIngredientDto, UpdateIngredientDto } from "./dto";
import { IngredientsService } from "./ingredients.service";

/**
 * Capa Controller del feature Ingredients.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class IngredientsController extends BaseController {
  public constructor(
    private readonly service: IngredientsService = new IngredientsService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredients = await this.service.getAll();
      res.status(200).json({ ingredients });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredient = await this.service.getOne(this.paramId(req));
      res.status(200).json({ ingredient });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredient = await this.service.create(req.body as CreateIngredientDto);
      res.status(201).json({ ingredient });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredient = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateIngredientDto
      );
      res.status(200).json({ ingredient });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredient = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchIngredientDto
      );
      res.status(200).json({ ingredient });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Ingredient permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ingredient = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Ingredient deactivated (logical delete)", ingredient });
    });
  }
}
