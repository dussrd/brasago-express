import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateOrderDetailDto, PatchOrderDetailDto, UpdateOrderDetailDto } from "./dto";
import { OrderDetailsService } from "./order-details.service";

/**
 * Capa Controller del feature OrderDetails.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
export class OrderDetailsController extends BaseController {
  public constructor(
    private readonly service: OrderDetailsService = new OrderDetailsService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetails = await this.service.getAll();
      res.status(200).json({ orderDetails });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetail = await this.service.getOne(this.paramId(req));
      res.status(200).json({ orderDetail });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetail = await this.service.create(req.body as CreateOrderDetailDto);
      res.status(201).json({ orderDetail });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetail = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateOrderDetailDto
      );
      res.status(200).json({ orderDetail });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetail = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchOrderDetailDto
      );
      res.status(200).json({ orderDetail });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "OrderDetail permanently deleted", id });
    });
  }
  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const orderDetail = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "OrderDetail deactivated (logical delete)", orderDetail });
    });
  }
}
