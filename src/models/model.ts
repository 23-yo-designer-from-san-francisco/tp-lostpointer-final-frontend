export abstract class Model<TModel> {
  public props: TModel;

  constructor(props: any = null) {
    this.props = props;
  }

  getProps(): TModel {
    return this.props;
  }
}
