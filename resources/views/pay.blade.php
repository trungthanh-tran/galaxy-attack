@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <aside class="col-lg-9">
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-borderless table-shopping-cart">
                            <thead class="text-muted">
                            <tr class="small text-uppercase">
                                <th scope="col">Product</th>
                                <th scope="col">Description</th>
                                <th scope="col" width="120">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {{ $name }}
                                </td>
                                <td><img src='{{ $url }}' width='50' class='zoom'/></td>
                                <td>
                                    <var class="price">{{ $price }}</var>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </aside>
            <aside class="col-lg-3">
                <div class="card mb-3">
                    <div class="card-body">
                        <form>
                            <div class="form-group"> <label>Have coupon?</label>
                                <div class="input-group"> <input type="text" class="form-control coupon" name="" placeholder="Coupon code"></div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <dl class="dlist-align">
                            <dt>Total price:</dt>
                            <dd class="text-right ml-3">{{ $price }}</dd>
                        </dl>

                        <dl class="dlist-align">
                            <dt>Total:</dt>
                            <dd class="text-right text-dark b ml-3"><strong>{{ $price }}</strong></dd>
                        </dl>
                        <hr> <a href="#" class="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Make Purchase </a> <a href="/" class="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Play Game</a>
                    </div>
                </div>
            </aside>
        </div>
    </div>
@endsection

