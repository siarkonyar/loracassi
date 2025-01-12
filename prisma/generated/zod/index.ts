import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PostScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','createdById']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','refresh_token_expires_in']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','emailVerified','phoneNumber','locale','lastLogin','lastActivity','lastPasswordChange','role']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const CartScalarFieldEnumSchema = z.enum(['id','userId','sessionId','createdAt','updatedAt']);

export const CartItemScalarFieldEnumSchema = z.enum(['id','cartId','productId','quantity']);

export const ProductScalarFieldEnumSchema = z.enum(['id','name','price','discount','headImage','images','createdAt','updatedAt','description','categoryId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const PostOrderByRelevanceFieldEnumSchema = z.enum(['name','createdById']);

export const NullsOrderSchema = z.enum(['first','last']);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['id','sessionToken','userId']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','phoneNumber']);

export const CategoryOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const CartOrderByRelevanceFieldEnumSchema = z.enum(['userId','sessionId']);

export const CartItemOrderByRelevanceFieldEnumSchema = z.enum(['productId']);

export const ProductOrderByRelevanceFieldEnumSchema = z.enum(['id','name','headImage','images','description']);

export const VerificationTokenOrderByRelevanceFieldEnumSchema = z.enum(['identifier','token']);

export const UserRoleSchema = z.enum(['USER','ADMIN']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const LocaleSchema = z.enum(['en','tr']);

export type LocaleType = `${z.infer<typeof LocaleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST PARTIAL SCHEMA
/////////////////////////////////////////

export const PostPartialSchema = PostSchema.partial()

export type PostPartial = z.infer<typeof PostPartialSchema>

// POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

// POST RELATION SCHEMA
//------------------------------------------------------

export type PostRelations = {
  createdBy: UserWithRelations;
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> = PostSchema.merge(z.object({
  createdBy: z.lazy(() => UserWithRelationsSchema),
}))

// POST OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PostOptionalDefaultsRelations = {
  createdBy: UserOptionalDefaultsWithRelations;
};

export type PostOptionalDefaultsWithRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostOptionalDefaultsRelations

export const PostOptionalDefaultsWithRelationsSchema: z.ZodType<PostOptionalDefaultsWithRelations> = PostOptionalDefaultsSchema.merge(z.object({
  createdBy: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

// POST PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PostPartialRelations = {
  createdBy?: UserPartialWithRelations;
};

export type PostPartialWithRelations = z.infer<typeof PostPartialSchema> & PostPartialRelations

export const PostPartialWithRelationsSchema: z.ZodType<PostPartialWithRelations> = PostPartialSchema.merge(z.object({
  createdBy: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type PostOptionalDefaultsWithPartialRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostPartialRelations

export const PostOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostOptionalDefaultsWithPartialRelations> = PostOptionalDefaultsSchema.merge(z.object({
  createdBy: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export type PostWithPartialRelations = z.infer<typeof PostSchema> & PostPartialRelations

export const PostWithPartialRelationsSchema: z.ZodType<PostWithPartialRelations> = PostSchema.merge(z.object({
  createdBy: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  refresh_token_expires_in: z.number().int().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccountOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
};

export type AccountOptionalDefaultsWithRelations = z.infer<typeof AccountOptionalDefaultsSchema> & AccountOptionalDefaultsRelations

export const AccountOptionalDefaultsWithRelationsSchema: z.ZodType<AccountOptionalDefaultsWithRelations> = AccountOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type AccountOptionalDefaultsWithPartialRelations = z.infer<typeof AccountOptionalDefaultsSchema> & AccountPartialRelations

export const AccountOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AccountOptionalDefaultsWithPartialRelations> = AccountOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export type AccountWithPartialRelations = z.infer<typeof AccountSchema> & AccountPartialRelations

export const AccountWithPartialRelationsSchema: z.ZodType<AccountWithPartialRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
  cart?: CartWithRelations | null;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  cart: z.lazy(() => CartWithRelationsSchema).nullish(),
}))

// SESSION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type SessionOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  cart?: CartOptionalDefaultsWithRelations | null;
};

export type SessionOptionalDefaultsWithRelations = z.infer<typeof SessionOptionalDefaultsSchema> & SessionOptionalDefaultsRelations

export const SessionOptionalDefaultsWithRelationsSchema: z.ZodType<SessionOptionalDefaultsWithRelations> = SessionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  cart: z.lazy(() => CartOptionalDefaultsWithRelationsSchema).nullish(),
}))

// SESSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type SessionPartialRelations = {
  user?: UserPartialWithRelations;
  cart?: CartPartialWithRelations | null;
};

export type SessionPartialWithRelations = z.infer<typeof SessionPartialSchema> & SessionPartialRelations

export const SessionPartialWithRelationsSchema: z.ZodType<SessionPartialWithRelations> = SessionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
})).partial()

export type SessionOptionalDefaultsWithPartialRelations = z.infer<typeof SessionOptionalDefaultsSchema> & SessionPartialRelations

export const SessionOptionalDefaultsWithPartialRelationsSchema: z.ZodType<SessionOptionalDefaultsWithPartialRelations> = SessionOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
}).partial())

export type SessionWithPartialRelations = z.infer<typeof SessionSchema> & SessionPartialRelations

export const SessionWithPartialRelationsSchema: z.ZodType<SessionWithPartialRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
}).partial())

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  locale: LocaleSchema,
  role: UserRoleSchema,
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  password: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  phoneNumber: z.string().nullish(),
  lastLogin: z.coerce.date().nullish(),
  lastActivity: z.coerce.date().nullish(),
  lastPasswordChange: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  locale: LocaleSchema.optional(),
  role: UserRoleSchema.optional(),
  id: z.string().cuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  posts: PostWithRelations[];
  cart?: CartWithRelations | null;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  posts: z.lazy(() => PostWithRelationsSchema).array(),
  cart: z.lazy(() => CartWithRelationsSchema).nullish(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  accounts: AccountOptionalDefaultsWithRelations[];
  sessions: SessionOptionalDefaultsWithRelations[];
  posts: PostOptionalDefaultsWithRelations[];
  cart?: CartOptionalDefaultsWithRelations | null;
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountOptionalDefaultsWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionOptionalDefaultsWithRelationsSchema).array(),
  posts: z.lazy(() => PostOptionalDefaultsWithRelationsSchema).array(),
  cart: z.lazy(() => CartOptionalDefaultsWithRelationsSchema).nullish(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  accounts?: AccountPartialWithRelations[];
  sessions?: SessionPartialWithRelations[];
  posts?: PostPartialWithRelations[];
  cart?: CartPartialWithRelations | null;
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  cart: z.lazy(() => CartPartialWithRelationsSchema).nullish(),
}).partial())

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// CATEGORY PARTIAL SCHEMA
/////////////////////////////////////////

export const CategoryPartialSchema = CategorySchema.partial()

export type CategoryPartial = z.infer<typeof CategoryPartialSchema>

// CATEGORY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CategoryOptionalDefaultsSchema = CategorySchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type CategoryOptionalDefaults = z.infer<typeof CategoryOptionalDefaultsSchema>

// CATEGORY RELATION SCHEMA
//------------------------------------------------------

export type CategoryRelations = {
  products: ProductWithRelations[];
};

export type CategoryWithRelations = z.infer<typeof CategorySchema> & CategoryRelations

export const CategoryWithRelationsSchema: z.ZodType<CategoryWithRelations> = CategorySchema.merge(z.object({
  products: z.lazy(() => ProductWithRelationsSchema).array(),
}))

// CATEGORY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CategoryOptionalDefaultsRelations = {
  products: ProductOptionalDefaultsWithRelations[];
};

export type CategoryOptionalDefaultsWithRelations = z.infer<typeof CategoryOptionalDefaultsSchema> & CategoryOptionalDefaultsRelations

export const CategoryOptionalDefaultsWithRelationsSchema: z.ZodType<CategoryOptionalDefaultsWithRelations> = CategoryOptionalDefaultsSchema.merge(z.object({
  products: z.lazy(() => ProductOptionalDefaultsWithRelationsSchema).array(),
}))

// CATEGORY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CategoryPartialRelations = {
  products?: ProductPartialWithRelations[];
};

export type CategoryPartialWithRelations = z.infer<typeof CategoryPartialSchema> & CategoryPartialRelations

export const CategoryPartialWithRelationsSchema: z.ZodType<CategoryPartialWithRelations> = CategoryPartialSchema.merge(z.object({
  products: z.lazy(() => ProductPartialWithRelationsSchema).array(),
})).partial()

export type CategoryOptionalDefaultsWithPartialRelations = z.infer<typeof CategoryOptionalDefaultsSchema> & CategoryPartialRelations

export const CategoryOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CategoryOptionalDefaultsWithPartialRelations> = CategoryOptionalDefaultsSchema.merge(z.object({
  products: z.lazy(() => ProductPartialWithRelationsSchema).array(),
}).partial())

export type CategoryWithPartialRelations = z.infer<typeof CategorySchema> & CategoryPartialRelations

export const CategoryWithPartialRelationsSchema: z.ZodType<CategoryWithPartialRelations> = CategorySchema.merge(z.object({
  products: z.lazy(() => ProductPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// CART SCHEMA
/////////////////////////////////////////

export const CartSchema = z.object({
  id: z.number().int(),
  userId: z.string().nullish(),
  sessionId: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Cart = z.infer<typeof CartSchema>

/////////////////////////////////////////
// CART PARTIAL SCHEMA
/////////////////////////////////////////

export const CartPartialSchema = CartSchema.partial()

export type CartPartial = z.infer<typeof CartPartialSchema>

// CART OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CartOptionalDefaultsSchema = CartSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CartOptionalDefaults = z.infer<typeof CartOptionalDefaultsSchema>

// CART RELATION SCHEMA
//------------------------------------------------------

export type CartRelations = {
  user?: UserWithRelations | null;
  session?: SessionWithRelations | null;
  items: CartItemWithRelations[];
};

export type CartWithRelations = z.infer<typeof CartSchema> & CartRelations

export const CartWithRelationsSchema: z.ZodType<CartWithRelations> = CartSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
  session: z.lazy(() => SessionWithRelationsSchema).nullish(),
  items: z.lazy(() => CartItemWithRelationsSchema).array(),
}))

// CART OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CartOptionalDefaultsRelations = {
  user?: UserOptionalDefaultsWithRelations | null;
  session?: SessionOptionalDefaultsWithRelations | null;
  items: CartItemOptionalDefaultsWithRelations[];
};

export type CartOptionalDefaultsWithRelations = z.infer<typeof CartOptionalDefaultsSchema> & CartOptionalDefaultsRelations

export const CartOptionalDefaultsWithRelationsSchema: z.ZodType<CartOptionalDefaultsWithRelations> = CartOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullish(),
  session: z.lazy(() => SessionOptionalDefaultsWithRelationsSchema).nullish(),
  items: z.lazy(() => CartItemOptionalDefaultsWithRelationsSchema).array(),
}))

// CART PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CartPartialRelations = {
  user?: UserPartialWithRelations | null;
  session?: SessionPartialWithRelations | null;
  items?: CartItemPartialWithRelations[];
};

export type CartPartialWithRelations = z.infer<typeof CartPartialSchema> & CartPartialRelations

export const CartPartialWithRelationsSchema: z.ZodType<CartPartialWithRelations> = CartPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  session: z.lazy(() => SessionPartialWithRelationsSchema).nullish(),
  items: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
})).partial()

export type CartOptionalDefaultsWithPartialRelations = z.infer<typeof CartOptionalDefaultsSchema> & CartPartialRelations

export const CartOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CartOptionalDefaultsWithPartialRelations> = CartOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  session: z.lazy(() => SessionPartialWithRelationsSchema).nullish(),
  items: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
}).partial())

export type CartWithPartialRelations = z.infer<typeof CartSchema> & CartPartialRelations

export const CartWithPartialRelationsSchema: z.ZodType<CartWithPartialRelations> = CartSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  session: z.lazy(() => SessionPartialWithRelationsSchema).nullish(),
  items: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// CART ITEM SCHEMA
/////////////////////////////////////////

export const CartItemSchema = z.object({
  id: z.number().int(),
  cartId: z.number().int(),
  productId: z.string(),
  quantity: z.number().int(),
})

export type CartItem = z.infer<typeof CartItemSchema>

/////////////////////////////////////////
// CART ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const CartItemPartialSchema = CartItemSchema.partial()

export type CartItemPartial = z.infer<typeof CartItemPartialSchema>

// CART ITEM OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CartItemOptionalDefaultsSchema = CartItemSchema.merge(z.object({
  id: z.number().int().optional(),
  quantity: z.number().int().optional(),
}))

export type CartItemOptionalDefaults = z.infer<typeof CartItemOptionalDefaultsSchema>

// CART ITEM RELATION SCHEMA
//------------------------------------------------------

export type CartItemRelations = {
  cart: CartWithRelations;
  product: ProductWithRelations;
};

export type CartItemWithRelations = z.infer<typeof CartItemSchema> & CartItemRelations

export const CartItemWithRelationsSchema: z.ZodType<CartItemWithRelations> = CartItemSchema.merge(z.object({
  cart: z.lazy(() => CartWithRelationsSchema),
  product: z.lazy(() => ProductWithRelationsSchema),
}))

// CART ITEM OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CartItemOptionalDefaultsRelations = {
  cart: CartOptionalDefaultsWithRelations;
  product: ProductOptionalDefaultsWithRelations;
};

export type CartItemOptionalDefaultsWithRelations = z.infer<typeof CartItemOptionalDefaultsSchema> & CartItemOptionalDefaultsRelations

export const CartItemOptionalDefaultsWithRelationsSchema: z.ZodType<CartItemOptionalDefaultsWithRelations> = CartItemOptionalDefaultsSchema.merge(z.object({
  cart: z.lazy(() => CartOptionalDefaultsWithRelationsSchema),
  product: z.lazy(() => ProductOptionalDefaultsWithRelationsSchema),
}))

// CART ITEM PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CartItemPartialRelations = {
  cart?: CartPartialWithRelations;
  product?: ProductPartialWithRelations;
};

export type CartItemPartialWithRelations = z.infer<typeof CartItemPartialSchema> & CartItemPartialRelations

export const CartItemPartialWithRelationsSchema: z.ZodType<CartItemPartialWithRelations> = CartItemPartialSchema.merge(z.object({
  cart: z.lazy(() => CartPartialWithRelationsSchema),
  product: z.lazy(() => ProductPartialWithRelationsSchema),
})).partial()

export type CartItemOptionalDefaultsWithPartialRelations = z.infer<typeof CartItemOptionalDefaultsSchema> & CartItemPartialRelations

export const CartItemOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CartItemOptionalDefaultsWithPartialRelations> = CartItemOptionalDefaultsSchema.merge(z.object({
  cart: z.lazy(() => CartPartialWithRelationsSchema),
  product: z.lazy(() => ProductPartialWithRelationsSchema),
}).partial())

export type CartItemWithPartialRelations = z.infer<typeof CartItemSchema> & CartItemPartialRelations

export const CartItemWithPartialRelationsSchema: z.ZodType<CartItemWithPartialRelations> = CartItemSchema.merge(z.object({
  cart: z.lazy(() => CartPartialWithRelationsSchema),
  product: z.lazy(() => ProductPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  price: z.number().int(),
  discount: z.number().int().nullish(),
  headImage: z.string(),
  images: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  description: z.string().nullish(),
  categoryId: z.number().int().nullish(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT PARTIAL SCHEMA
/////////////////////////////////////////

export const ProductPartialSchema = ProductSchema.partial()

export type ProductPartial = z.infer<typeof ProductPartialSchema>

// PRODUCT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ProductOptionalDefaultsSchema = ProductSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ProductOptionalDefaults = z.infer<typeof ProductOptionalDefaultsSchema>

// PRODUCT RELATION SCHEMA
//------------------------------------------------------

export type ProductRelations = {
  Category?: CategoryWithRelations | null;
  CartItem: CartItemWithRelations[];
};

export type ProductWithRelations = z.infer<typeof ProductSchema> & ProductRelations

export const ProductWithRelationsSchema: z.ZodType<ProductWithRelations> = ProductSchema.merge(z.object({
  Category: z.lazy(() => CategoryWithRelationsSchema).nullish(),
  CartItem: z.lazy(() => CartItemWithRelationsSchema).array(),
}))

// PRODUCT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ProductOptionalDefaultsRelations = {
  Category?: CategoryOptionalDefaultsWithRelations | null;
  CartItem: CartItemOptionalDefaultsWithRelations[];
};

export type ProductOptionalDefaultsWithRelations = z.infer<typeof ProductOptionalDefaultsSchema> & ProductOptionalDefaultsRelations

export const ProductOptionalDefaultsWithRelationsSchema: z.ZodType<ProductOptionalDefaultsWithRelations> = ProductOptionalDefaultsSchema.merge(z.object({
  Category: z.lazy(() => CategoryOptionalDefaultsWithRelationsSchema).nullish(),
  CartItem: z.lazy(() => CartItemOptionalDefaultsWithRelationsSchema).array(),
}))

// PRODUCT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ProductPartialRelations = {
  Category?: CategoryPartialWithRelations | null;
  CartItem?: CartItemPartialWithRelations[];
};

export type ProductPartialWithRelations = z.infer<typeof ProductPartialSchema> & ProductPartialRelations

export const ProductPartialWithRelationsSchema: z.ZodType<ProductPartialWithRelations> = ProductPartialSchema.merge(z.object({
  Category: z.lazy(() => CategoryPartialWithRelationsSchema).nullish(),
  CartItem: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
})).partial()

export type ProductOptionalDefaultsWithPartialRelations = z.infer<typeof ProductOptionalDefaultsSchema> & ProductPartialRelations

export const ProductOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ProductOptionalDefaultsWithPartialRelations> = ProductOptionalDefaultsSchema.merge(z.object({
  Category: z.lazy(() => CategoryPartialWithRelationsSchema).nullish(),
  CartItem: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
}).partial())

export type ProductWithPartialRelations = z.infer<typeof ProductSchema> & ProductPartialRelations

export const ProductWithPartialRelationsSchema: z.ZodType<ProductWithPartialRelations> = ProductSchema.merge(z.object({
  Category: z.lazy(() => CategoryPartialWithRelationsSchema).nullish(),
  CartItem: z.lazy(() => CartItemPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const VerificationTokenPartialSchema = VerificationTokenSchema.partial()

export type VerificationTokenPartial = z.infer<typeof VerificationTokenPartialSchema>

// VERIFICATION TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const VerificationTokenOptionalDefaultsSchema = VerificationTokenSchema.merge(z.object({
}))

export type VerificationTokenOptionalDefaults = z.infer<typeof VerificationTokenOptionalDefaultsSchema>
