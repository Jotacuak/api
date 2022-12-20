var DataTypes = require("sequelize").DataTypes;
var _CartDetail = require("./cart-detail");
var _Cart = require("./cart");
var _Client = require("./client");
var _CompanyDetail = require("./company-detail");
var _Contact = require("./contact");
var _Fingerprint = require("./fingerprint");
var _ImageConfig = require("./image-config");
var _ImageOriginal = require("./image-original");
var _ImageResize = require("./image-resize");
var _Language = require("./language");
var _Locale = require("./locale");
var _PayMethod = require("./pay-method");
var _PaybackDetail = require("./payback-detail");
var _Payback = require("./payback");
var _ProductCategory = require("./product-category");
var _Product = require("./product");
var _SaleDetail = require("./sale-detail");
var _SaleIssue = require("./sale-issue");
var _Sale = require("./sale");
var _Slider = require("./slider");
var _Tax = require("./tax");

function initModels(sequelize) {
    var CartDetail = _CartDetail(sequelize, DataTypes);
    var Cart = _Cart(sequelize, DataTypes);
    var Client = _Client(sequelize, DataTypes);
    var CompanyDetail = _CompanyDetail(sequelize, DataTypes);
    var Contact = _Contact(sequelize, DataTypes);
    var Fingerprint = _Fingerprint(sequelize, DataTypes);
    var ImageConfig = _ImageConfig(sequelize, DataTypes);
    var ImageOriginal = _ImageOriginal(sequelize, DataTypes);
    var ImageResize = _ImageResize(sequelize, DataTypes);
    var Language = _Language(sequelize, DataTypes);
    var Locale = _Locale(sequelize, DataTypes);
    var PayMethod = _PayMethod(sequelize, DataTypes);
    var PaybackDetail = _PaybackDetail(sequelize, DataTypes);
    var Payback = _Payback(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);
    var SaleDetail = _SaleDetail(sequelize, DataTypes);
    var SaleIssue = _SaleIssue(sequelize, DataTypes);
    var Sale = _Sale(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);

    CartDetail.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(CartDetail, { as: "cart_details", foreignKey: "cartId"});
    SaleIssue.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(SaleIssue, { as: "sale_issues", foreignKey: "cartId"});
    Sale.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
    Cart.hasMany(Sale, { as: "sales", foreignKey: "cartId"});
    Cart.belongsTo(Client, { as: "client", foreignKey: "clientId"});
    Client.hasMany(Cart, { as: "carts", foreignKey: "clientId"});
    Fingerprint.belongsTo(Client, { as: "client", foreignKey: "clientId"});
    Client.hasMany(Fingerprint, { as: "fingerprints", foreignKey: "clientId"});
    Payback.belongsTo(Client, { as: "client", foreignKey: "clientId"});
    Client.hasMany(Payback, { as: "paybacks", foreignKey: "clientId"});
    SaleIssue.belongsTo(Client, { as: "client", foreignKey: "clientId"});
    Client.hasMany(SaleIssue, { as: "sale_issues", foreignKey: "clientId"});
    Sale.belongsTo(Client, { as: "client", foreignKey: "clientId"});
    Client.hasMany(Sale, { as: "sales", foreignKey: "clientId"});
    Cart.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Cart, { as: "carts", foreignKey: "fingerprintId"});
    Contact.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Contact, { as: "contacts", foreignKey: "fingerprintId"});
    ImageResize.belongsTo(ImageConfig, { as: "imageConfig", foreignKey: "imageConfigsId"});
    ImageConfig.hasMany(ImageResize, { as: "image_resizes", foreignKey: "imageConfigsId"});
    ImageResize.belongsTo(ImageOriginal, { as: "imageOriginal", foreignKey: "imageOriginalsId"});
    ImageOriginal.hasMany(ImageResize, { as: "image_resizes", foreignKey: "imageOriginalsId"});
    Payback.belongsTo(PayMethod, { as: "payMethod", foreignKey: "payMethodId"});
    PayMethod.hasMany(Payback, { as: "paybacks", foreignKey: "payMethodId"});
    SaleIssue.belongsTo(PayMethod, { as: "payMethod", foreignKey: "payMethodId"});
    PayMethod.hasMany(SaleIssue, { as: "sale_issues", foreignKey: "payMethodId"});
    Sale.belongsTo(PayMethod, { as: "payMethod", foreignKey: "payMethodId"});
    PayMethod.hasMany(Sale, { as: "sales", foreignKey: "payMethodId"});
    PaybackDetail.belongsTo(Payback, { as: "payback", foreignKey: "paybackId"});
    Payback.hasMany(PaybackDetail, { as: "payback_details", foreignKey: "paybackId"});
    Product.belongsTo(ProductCategory, { as: "category", foreignKey: "categoryId"});
    ProductCategory.hasMany(Product, { as: "products", foreignKey: "categoryId"});
    CartDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(CartDetail, { as: "cart_details", foreignKey: "productId"});
    PaybackDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(PaybackDetail, { as: "payback_details", foreignKey: "productId"});
    SaleDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(SaleDetail, { as: "sale_details", foreignKey: "productId"});
    Payback.belongsTo(Sale, { as: "sale", foreignKey: "saleId"});
    Sale.hasMany(Payback, { as: "paybacks", foreignKey: "saleId"});
    SaleDetail.belongsTo(Sale, { as: "sale", foreignKey: "saleId"});
    Sale.hasMany(SaleDetail, { as: "sale_details", foreignKey: "saleId"});
    Product.belongsTo(Tax, { as: "tax", foreignKey: "taxId"});
    Tax.hasMany(Product, { as: "products", foreignKey: "taxId"});

    return {
        CartDetail,
        Cart,
        Client,
        CompanyDetail,
        Contact,
        Fingerprint,
        ImageConfig,
        ImageOriginal,
        ImageResize,
        Language,
        Locale,
        PayMethod,
        PaybackDetail,
        Payback,
        ProductCategory,
        Product,
        SaleDetail,
        SaleIssue,
        Sale,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
