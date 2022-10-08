export abstract class Model<TModel> {
  public props: TModel;

  // @ts-ignore
  protected constructor(props: TModel = null) {
    this.props = props;
  }

  getProps(): TModel {
    return this.props;
  }
}
