import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateCustomerDto, PatchCustomerDto, UpdateCustomerDto } from "./dto";
import { CustomersService } from "./customers.service";

/**
 * Capa Controller del feature Customers.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class CustomersController extends BaseController {
  public constructor(
    private readonly service: CustomersService = new CustomersService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customers = await this.service.getAll();
      res.status(200).json({ customers });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customer = await this.service.getOne(this.paramId(req));
      res.status(200).json({ customer });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customer = await this.service.create(req.body as CreateCustomerDto);
      res.status(201).json({ customer });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customer = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateCustomerDto
      );
      res.status(200).json({ customer });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customer = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchCustomerDto
      );
      res.status(200).json({ customer });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Customer permanently deleted", id });
    });
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const customer = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Customer deactivated (logical delete)", customer });
    });
  }
}
