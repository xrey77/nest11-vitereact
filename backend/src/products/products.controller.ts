import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationOptionsDto } from './dto/pagination-options.dto';
import { PageDto } from './dto/page.dto';
import { Product } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ): Promise<Pagination<Product>> {
    let limit: number = 5;
    return this.productsService.paginate({
      page,
      limit,
    });
  }

  // http://localhost:3000/api/products/productlist?page=1
  @Get('productlist')
  async findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PageDto<Product>> {
      return this.productsService.findAllPaginated(paginationOptions);
  }

  //http://localhost:3000/api/products/productsearch?page=1&keyword=cineo
  @Get('productsearch')
  async findSearch(@Query('page')page: number, @Query('keyword')keyword: string, ): Promise<PageDto<Product>> {
      return this.productsService.findSearchPaginated(page,keyword);
  }

}
