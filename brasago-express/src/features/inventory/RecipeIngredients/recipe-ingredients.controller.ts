import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateRecipeIngredientDto, PatchRecipeIngredientDto, UpdateRecipeIngredientDto } from "./dto";
import { RecipeIngredientsService } from "./recipe-ingredients.service";

/**
 * Capa Controller del feature RecipeIngredients.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class RecipeIngredientsController extends BaseController {
  public constructor(
    private readonly service: RecipeIngredientsService = new RecipeIngredientsService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredients = await this.service.getAll();
      res.status(200).json({ recipeIngredients });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredient = await this.service.getOne(this.paramId(req));
      res.status(200).json({ recipeIngredient });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredient = await this.service.create(req.body as CreateRecipeIngredientDto);
      res.status(201).json({ recipeIngredient });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredient = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateRecipeIngredientDto
      );
      res.status(200).json({ recipeIngredient });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredient = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchRecipeIngredientDto
      );
      res.status(200).json({ recipeIngredient });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "RecipeIngredient permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const recipeIngredient = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "RecipeIngredient deactivated (logical delete)", recipeIngredient });
    });
  }
}
